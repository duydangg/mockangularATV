import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user';
import { UserService } from '../../service/user.service';
import { FirebaseService } from '../../service/firebase.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { catchError, map, tap } from 'rxjs/operators';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AngularFireAuth]
})
export class RegisterComponent implements OnInit {

  RegisterData;
  // RegisterList = [];
  users: User[];
  b: number;
  
  items: Array<any>;
  constructor(
    private router: Router,
    private userService: UserService,
    private firebaseService: FirebaseService, 
    public db: AngularFirestore,
    ) { }
  submitted = false;

  ngOnInit() {
    this.RegisterData = new FormGroup({
      email: new FormControl(""),
      password: new FormControl(""),
      name: new FormControl(""),
      age: new FormControl(""),
      address: new FormControl(""),
      work: new FormControl(""),
      status: new FormControl(""),

    });
  }

  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;
    })
  }

  tryRegister(value){
    this.firebaseService.doRegister(value)
    .then(res => {
      console.log(res);
      alert("Success");
    }, err => {
      console.log(err);
      alert("Fail");
    })
  }

  onClickSubmit(data1) {
    this.submitted = true;
    let fb: FirebaseService;
    let info = {
      "email" : data1.email,
      "password": data1.password,
      "name" : data1.name,
      "age" : data1.age,
      "address" : data1.address,
      "work" : data1.work,
      "status" : data1.status
    };
    if(data1.age < 18) {
      alert("Must be >= 18");
      this.router.navigate(['/login']);
    }

    this.db.collection('Users', ref => ref.where('email', '==', data1.email))
    .get().toPromise().then(function(querySnapshot) {
      let newLocal = 0;
      let fb2: FirebaseService;
      let router2: Router;
      if (querySnapshot.size > 0) {
        // Contents of first document
        console.log(querySnapshot.docs[0].data());
        alert("Email was taken");
        // this.router.navigate(['/login']);
        // location.reload();
      } else {
        console.log("No such document!");
        alert("Success");
        router2.navigate(['/login']);
      }
    })
    .then(function(error) {
      console.log("Error getting document: ", error);
    });
    console.log("dfsgd");
    console.log();
    // var docRef = this.firebaseService.getUserByEmail(data1.email);
    // docRef.get().toPromise().then(function(doc) {
    //   if(doc.exists) {
    //     debugger
    //     alert("Email was taken");
    //     this.router.navigate(['/login']);
    //   }
    //   else {
    //     alert("1223");
    //   }
    // }).catch(function(error) {
    //   console.log("Error getting document:", error);
    // });



    
    // this.firebaseService.createUser(info);
    // this.router.navigate(['/login']);

 
  }

}
