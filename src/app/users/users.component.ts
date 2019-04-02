import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { catchError, map, tap } from 'rxjs/operators';
import { Router, Params } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  currentUser: User;
  currentUserSubscription: Subscription;
  items: Array<any>;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private firebaseService: FirebaseService,
    private router: Router,
    private location: Location
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }



  ngOnInit() {
    this.getData();
    
  }


  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
    })
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }


  // deleteUser(id: number) {
  //   this.userService.delete(id).pipe(first()).subscribe(() => {
  //     this.loadAllUsers()
  //   });
  // }


  viewDetails(item){
    this.router.navigate(['/detail/'+ item.payload.doc.id])
  }


  // private loadAllUsers() {
  //   this.userService.getAll().pipe(first()).subscribe(users => {
  //     this.users = users;
  //   });
  // }

  logout(){
    // this.firebaseService.doLogout()
    // .then((res) => {
    //   this.router.navigate(['/login']);
    // }, (error) => {
    //   console.log("Logout error", error);
    // });
    this.firebaseService.doLogout();
    this.router.navigate(['/login']);
  }

  // save(data): void {
  //   data.email = this.currentUser.email;
  //   data.password = this.currentUser.password;
  //   // data.id = this.currentUser.id;
  //   this.userService.update(data).toPromise().then(data => {
  //     debugger
  //     alert("Update Successful");
  //   });
  // }

}

