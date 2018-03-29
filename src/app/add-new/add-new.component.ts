import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  addnew: FormGroup;
  values: any;

  constructor(private _fb: FormBuilder) { 

    this.addnew = this._fb.group ({
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      email:  ['', [Validators.required, Validators.email]],
    });

  }

  send(a){
    console.log(a);
    this.values = a.value;
    console.log(a.value);
  }

  ngOnInit() {
  }

}
