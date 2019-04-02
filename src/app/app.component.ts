import { Component } from '@angular/core';
//import * as firebase from "firebase/app";
import 'firebase/database';
import 'firebase';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { Router, Params } from '@angular/router';

firebase.initializeApp(environment.config);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mock';

  constructor(private router: Router) {
    
  }

  toRegister() {
    this.router.navigate(['/register']);
  }
}
