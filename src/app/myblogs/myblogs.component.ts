import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {
  user: any;
  posts: any[] = [];
  constructor() {
    this.user = firebase.auth().currentUser
    this.getPosts();
   }

  ngOnInit() {
  }
  getPosts(){
    //Get all the post
    firebase.firestore().collection("posts").orderBy("created","desc").get().then(
      (quarySnapshot) => {
        console.log(quarySnapshot.docs);
        this.posts = quarySnapshot.docs;
      }).catch((error)=>{
        console.log(error);
      })
  }

  onPostCreated(){
    //Refresh the post
    this.posts = [];
    this.getPosts();
  }

  onDelete(){
    this.posts = [];
    this.getPosts();
  }
}
