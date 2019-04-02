import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../user';
import { UserService } from '../../service/user.service';
import { FirebaseService } from '../../service/firebase.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthenticationService } from '../../service/authentication.service';
import { first } from 'rxjs/operators';

// import { NB_AUTH_OPTIONS, NbAuthSocialLink } from '../auth.options';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  LoginData;
  user: User;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private firebaseService: FirebaseService, 
    public db: AngularFirestore,
    private authenticationService: AuthenticationService,
  ) { }
  
  submitted = false;

  ngOnInit() {
    this.LoginData = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });
  }

  get f() { return this.LoginData.controls; }


  tryLogin(value){
    this.firebaseService.doLogin(value)
    .then(res => {
      alert("Success");
      this.router.navigate(['/users']);
    }, err => {
      alert("Fail to login ");
      console.log(err);
    })
  }


  onClickSubmit(data) {
    this.submitted = true;
    // this.tryLogin(data);
    
    //check valid, dang nhap thanh cong thi navigate den home, ko thi dang nhap lai
    
    this.tryLogin(data);
    // this.authenticationService.login(data.email, data.password).pipe(first())
    // .subscribe(
    //     data => {
    //       debugger
    //       alert("Login Successful"); 
    //       this.router.navigate(['/users']);
    //       //alert("Login Successful");
    //     },
    //     error => {
    //       debugger
    //       this.router.navigate(['/login']);  
    //       alert("Invalid");
    //     });

  }

}
