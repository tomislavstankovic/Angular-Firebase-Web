import { Component, OnInit } from '@angular/core';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]
})

export class DashboardComponent implements OnInit {

   name: string;
   picture: string;
   email: string;

   heroes = [];
   heroesFavArray = [];

   obavijest: any;
   pick: number = 5;
   add: number;

  constructor(public _angularAuth: AngularFireAuth, 
              private _router: Router,
              public _apiService: ApiService,
              public _ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
     this.email = localStorage.getItem('email');
     this.name = localStorage.getItem('name');
     this.picture = localStorage.getItem('picture');
     this.getAllHeroes();
     this.provjera();
  }

  getAllHeroes(){
    this._apiService.allHeroes().subscribe(
      res => {
        for (let i = 0; i < res.data.results.length; i++) { 
          if(res.data.results[i].description.length > 1){
            this.heroes.push({
              id: res.data.results[i].id,
              name: res.data.results[i].name,
              description: res.data.results[i].description,
              modified: moment(res.data.results[i].modified).format('LL'),
              image: res.data.results[i].thumbnail.path + '.' + res.data.results[i].thumbnail.extension,
              details_url: res.data.results[i].urls[0].url
         })
          }
        }
      });
  }

  addToFavorites(a){
    let b = this;
    if(this.heroesFavArray.length == 0){
      this.heroesFavArray.push(a);
      this.obavijest = "Successfully added!"
      this.prikaziObavijest();
      this.pick = this.pick - 1;
      this.heroesFavArray.forEach(function(element) {
        b.add = element.id;
      });
    } else {
      if(this.heroesFavArray.length == 5){
        this.obavijest = "Max number of heroes are five!"
        this.prikaziObavijest();
      } else {
        this.heroesFavArray.push(a);
        this.obavijest = "Successfully added!"
        this.prikaziObavijest();
        this.pick = this.pick - 1;
        this.heroesFavArray.forEach(function(element) {
          b.add = element.id;
        });
      }
    }
  }

  removeFromFavorites(hero, index){
    this.heroesFavArray.splice(index, 1);
    this.obavijest = "Successfully removed!"
      this.prikaziObavijest();
      this.pick = this.pick + 1;
      if(this.heroesFavArray.length == 0){
          this.add = 0;
      }
  }

  prikaziObavijest(){
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  logout() {
    localStorage.clear();
    console.log('logged out');
    this._router.navigateByUrl('/login');
 }

 provjera(){
   if(!this.email){
    this._router.navigateByUrl('/login');
   }
 }

}