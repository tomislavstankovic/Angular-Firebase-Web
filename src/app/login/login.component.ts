import { Component, OnInit } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(public _angularAuth: AngularFireAuth, 
              private _router: Router) { }

  ngOnInit() {
    localStorage.clear();
  }

  loginGoogle(){
    let a = this;
    //this._angularAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(function(authData) {
      //console.log(authData);
      if(authData.credential.accessToken){
        localStorage.setItem('email', authData.user.email);
        localStorage.setItem('name', authData.additionalUserInfo.profile.name);
        localStorage.setItem('picture', authData.additionalUserInfo.profile.picture);
        a._router.navigate(['/dashboard']);
        location.reload(); 
      }
    }).catch(function(error) {
      //console.log(error);
      a.error = error.message;
      //console.log(a.error);
    });
  }

  loginFb(){
    let a = this;
    //this._angularAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(function(authData) {
      //console.log(authData);
      if(authData.credential.accessToken){
        localStorage.setItem('email', authData.additionalUserInfo.profile.email);
        localStorage.setItem('name', authData.additionalUserInfo.profile.name);
        localStorage.setItem('picture', authData.additionalUserInfo.profile.picture.data.url);
        a._router.navigate(['/dashboard']);
        location.reload(); 
      }
    }).catch(function(error) {
      //console.log(error);
      a.error = error.message;
      //console.log(a.error);
    });
  }

}