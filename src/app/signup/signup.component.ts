import { Component, OnInit } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: any;

  constructor(public _angularAuth: AngularFireAuth, 
              private _router: Router) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    let a = this;
    if(formData.valid) {
      console.log(formData.value);
      firebase.auth().createUserWithEmailAndPassword(formData.value.email, formData.value.password)
      .then(function(data) {
        console.log(data);
        if(data){
          a._router.navigate(['/email']);
        }
      }).catch(function(error) {
        console.log(error);
        a.error = error.message;
      });
    }
  }

}