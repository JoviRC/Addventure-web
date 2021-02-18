import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public serial: string

  constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  login(email: string, password: string) {

    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user)
      }).catch(err => rejected(err))
    })
  }
  testSerial(key: string) {
    return new Promise((resolve, reject) => {
      this.db.firestore.collection('serialProfesor').where('estado', '==', true).where('key', '==', key).get().then(doc => {
        resolve(doc)
      }).catch(err => alert('ERROR' + reject(err)))
    })
  }

  logOut() {
    this.AFauth.auth.signOut().then(auth => {
      this.router.navigate(['/login'])
    })
  }
  register(email: string, emailComp: string, password: string, passCon: string, name: string, lastname: string, school: string, curso: string) {

    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        const uid = res.user.uid
        this.db.collection('usersProfesor').doc(uid).set({
          email: email,
          emailComp: emailComp,
          password: password,
          passCon: passCon,
          name: name,
          lastname: lastname,
          school: school,
          curso: curso
        })
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  testkey(key: string) {
    return new Promise((resolve, reject) => {
      this.db.firestore.collection('serial').where('estado', '==', true).where('key', '==', key)
        .get()
        .then(res => {
          res.forEach(function (doc) {
            if (doc.exists) {
              resolve(res)
            } else {
              reject(res)
            }
          })
        }).catch(err => alert(err))
    })

  }

  updateSerial() {
    var key = this.serial
    this.db.firestore.collection('serialProfesor').doc(key).update({
      estado: false
    })
  }

}//este es el final

