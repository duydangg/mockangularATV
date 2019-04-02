import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { debug } from 'util';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../service/firebase.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  exampleForm: FormGroup;
  item: any;

  
  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    
    ) {}
    

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
        this.createForm();
      }
    })  
  }
  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name],
      age: [this.item.age],
      address: [this.item.address],
      work: [this.item.work],
      status: [this.item.status],
    });
  }


  onSubmit(value){
    // value.name = this.item.name;
    value.age = Number(value.age);
    // value.address = this.item.address;
    // value.work = this.item.work;
    // value.status = this.item.status;
    debugger
    this.firebaseService.updateUser(this.item.id, value)
    .then(
      
      res => {
        debugger
        this.router.navigate(['/users']);
      }
    )
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
    .then(
      res => {
        this.router.navigate(['/users']);
      },
      err => {
        console.log(err);
      }
    )
  }

  
}
