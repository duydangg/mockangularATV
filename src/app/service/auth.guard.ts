import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from './firebase.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.firebaseService.getCurrentUser()
      .then(user => {
        this.router.navigate(['/users']);
        return resolve(false);
      }, err => {
        return resolve(true);
      })
    })
  }
}