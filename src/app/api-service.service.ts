import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Md5} from 'ts-md5/dist/md5';

var PrivateKey = "013308cbf640595c7c538e7a0109577f6d05c9c3";
var PublicKey = "118ef4a2f446692cbe712e8ece961c94";
var TimeStamp = new Date().getTime();
var hash = Md5.hashStr(TimeStamp + PrivateKey + PublicKey).toString();

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  /*allHeroes(){
		return this._http.get('http://gateway.marvel.com:80/v1/public/comics')
				   .map(res => res.json());
  } */

  allHeroes(){
		return this._http.get('http://gateway.marvel.com/v1/public/characters?ts=' + TimeStamp + '&apikey=' + PublicKey + '&hash=' + hash + '&limit=100')
				   .map(res => res.json());
  } 

}