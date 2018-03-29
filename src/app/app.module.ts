import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { routes } from './app.routes';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { AddNewComponent } from './add-new/add-new.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDtIYlHU0a6I3ChEpd3MHccgqPXY_hdK9M",
  authDomain: "angularwebfirebaselogin.firebaseapp.com",
  databaseURL: "https://angularwebfirebaselogin.firebaseio.com",
  projectId: "angularwebfirebaselogin",
  storageBucket: "angularwebfirebaselogin.appspot.com",
  messagingSenderId: "636296375091"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailComponent,
    SignupComponent,
    DashboardComponent,
    AddNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    routes,
    NgxSmartModalModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
