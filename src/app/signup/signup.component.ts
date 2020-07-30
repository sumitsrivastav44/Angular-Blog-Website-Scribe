import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup , FormControl , Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm : FormGroup;
  message: string = "";
  userError: any;

  constructor(public fb : FormBuilder, public authService: AuthService) {
    this.myForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      email: ['',[Validators.required]],
      pwd: ['',[Validators.required, Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required]]
    },{
      validator: this.checkIfmatchingpassword("pwd","confirmPassword")
    })
   }

   checkIfmatchingpassword(passwordkey: string,confirmPasswordkey: string){
     return (group: FormGroup)=>{
       let password = group.controls[passwordkey];
       let confirmPassword = group.controls[confirmPasswordkey];

       if(password.value == confirmPassword.value){
         return;
       } else{
          confirmPassword.setErrors({
            NotEqualToPassword: true
         })
       }
     }
   }

   onSubmit(myForm){
     let email: string =myForm.value.email;
     let password: string = myForm.value.pwd;
     let firstName: string = myForm.value.firstName;
     let lastName: string = myForm.value.lastName;

     this.authService.signup(email,password,firstName,lastName)
     .then((user: any) => {

          firebase.firestore().collection("users").doc(user.uid).set({
            firstName: myForm.value.firstName,
            lastName: myForm.value.lastName,
            email: myForm.value.email,
            photoURL: user.photoURL,
            interests: "",
            bio: "",
            hobbies: ""
          }).then(()=>{

            this.message = "You have signed up successfully. Please login!"
          })

       }).catch((error) =>{
       console.log(error);
       this.userError= error;
     })
   }


  ngOnInit() {
  }

}
