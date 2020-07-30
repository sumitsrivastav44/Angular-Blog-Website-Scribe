import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { promise } from 'protractor';
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(email: string, pwd: string){
    return firebase.auth().signInWithEmailAndPassword(email, pwd);
  }

  signup(email: string, pwd: string, firstName: string, lastName: string){
    return new Promise((resolve, reject) =>{
      firebase.auth().createUserWithEmailAndPassword(email, pwd).then((response) =>{
        let randomNumber: number = Math.floor(Math.random()*1000); 
        response.user.updateProfile({
          displayName: firstName +""+lastName,
          photoURL: "http://api.adorable.io/avatars/"+ randomNumber
        }).then(()=>{
          resolve(response.user);
        }).catch((error)=>{
          reject(error);
        })
      }).catch((error)=>{
        reject(error);
      })
    })
  }

  constructor() { }
}
