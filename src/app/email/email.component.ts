import { Component, OnInit } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  error: any;

  constructor(public _angularAuth: AngularFireAuth, 
              private _router: Router) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    let a = this;
    firebase.auth().signInWithEmailAndPassword(formData.value.email, formData.value.password)
    .then(function(data) {
      //console.log(data);
      if(data){
        localStorage.setItem('email', data.email);
        a._router.navigate(['/dashboard']);
      }
    }).catch(function(error) {
      //console.log(error);
      a.error = error.message;
    });
  }

}