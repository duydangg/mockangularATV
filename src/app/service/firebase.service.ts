import { Injectable, DoBootstrap } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { validateConfig } from '@angular/router/src/config';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';    


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public db: AngularFirestore,
    private http: HttpClient,
    public afAuth: AngularFireAuth

  ) { }
  
  
  createUser(value){
    this.db.collection('Users').add({
      email: value.email,
      password: value.password,
      name: value.name,
      age: value.age,
      address: value.address,
      work: value.work,
      status: value.status,
    });
  }

  // doRegister(value){
  //   return new Promise<any>((resolve, reject) => {
  //     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
  //     .then(res => {
  //       resolve(res);
  //     }, err => reject(err))
  //   })
  // }

  updateUser(userKey, value){
    //value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('Users').doc(userKey).set(value);
  }

  getUserByEmail(email: string) {
    return this.db.collection("Users").doc(email);
  }

  getUserByEmail2(email: string) {
    this.db.collection("Users", ref => ref.where("email", '==', email))
    .get().toPromise().then(function(querySnapshot) {
      if (querySnapshot.size > 0) {
        // Contents of first document
        // console.log(querySnapshot.docs[0].data());
        // alert("Email was taken");
        //debugger
        // this.router.navigate(['/login']);
        // location.reload(true);
        return 1;
      } else {
        console.log("No such document!");
        return 0;
      }
    })
    .catch(function(error) {
      console.log("Error getting document: ", error);
    });
  }

  getUsers() {
    return this.db.collection('Users').snapshotChanges();
  }

  getUser(userKey){
    return this.db.collection('Users').doc(userKey).snapshotChanges();
  }

  deleteUser(userKey){
    return this.db.collection('Users').doc(userKey).delete();
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }


}
