import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BtgamemodeService {

  gOperador: string
  gLevel: string
  
  gBoolMis :boolean
  gidMis:string

  constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  //Game one Sumas
  async fnSaveTimeSumaGameOne(counter: number) {
    var _id = this.AFauth.auth.currentUser.uid
    var num = Math.round(counter / 1000)
    const increment = firebase.firestore.FieldValue.increment(num)

    const dataRef = this.db.collection('gameOne').doc(_id)

    dataRef.update({ timeSuma: increment })

  }
  async fnSaveContadorSumaGameOne() {
    var _id = this.AFauth.auth.currentUser.uid
    const increment = firebase.firestore.FieldValue.increment(1)

    const dataRef = this.db.collection('gameOne').doc(_id)

    dataRef.update({ contSuma: increment })

  }
  async fnSaveContadorSumaGameOneMalas() {
    var _id = this.AFauth.auth.currentUser.uid
    const increment = firebase.firestore.FieldValue.increment(1)

    const dataRef = this.db.collection('gameOne').doc(_id)

    dataRef.update({ contSumasMalas: increment })

  }
  //Game one Restas
  async fnSaveTimeRestaGameOne(counter: number) {
    var _id = this.AFauth.auth.currentUser.uid
    var num = Math.round(counter / 1000)
    const increment = firebase.firestore.FieldValue.increment(num)

    const dataRef = this.db.collection('gameOne').doc(_id)

    dataRef.update({ timeResta: increment })

  }
  async fnSaveContadorRestaGameOne() {
    var _id = this.AFauth.auth.currentUser.uid
    const increment = firebase.firestore.FieldValue.increment(1)

    const dataRef = this.db.collection('gameOne').doc(_id)

    dataRef.update({ contResta: increment })

  }
  async fnSaveContadorRestaGameOneMalas() {
    var _id = this.AFauth.auth.currentUser.uid
    const increment = firebase.firestore.FieldValue.increment(1)

    const dataRef = this.db.collection('gameOne').doc(_id)

    dataRef.update({ contRestasMalas: increment })

  }
  async fnSaveTimeSumaGameTwo(counter: number) {
    var _id = this.AFauth.auth.currentUser.uid
    var num = Math.round(counter / 1000)
    const increment = firebase.firestore.FieldValue.increment(num)

    const dataRef = this.db.collection('gameTwo').doc(_id)

    dataRef.update({ timeSuma: increment })

  }
  async fnSaveContadorSumaGameTwo() {
    var _id = this.AFauth.auth.currentUser.uid
    const increment = firebase.firestore.FieldValue.increment(1)

    const dataRef = this.db.collection('gameTwo').doc(_id)

    dataRef.update({ contSuma: increment })

  }
  async fnSaveTimeRestaGameTwo(counter: number) {
    var _id = this.AFauth.auth.currentUser.uid
    var num = Math.round(counter / 1000)
    const increment = firebase.firestore.FieldValue.increment(num)

    const dataRef = this.db.collection('gameTwo').doc(_id)

    dataRef.update({ timeResta: increment })
  }
  async fnSaveContadorRestaGameTwo() {
    var _id = this.AFauth.auth.currentUser.uid
    const increment = firebase.firestore.FieldValue.increment(1)

    const dataRef = this.db.collection('gameTwo').doc(_id)

    dataRef.update({ contResta: increment })

  }
  async fnSaveTimeMision(counterMis: number) {
    var _id = this.gidMis
    var num = Math.round(counterMis / 1000)
    const increment = firebase.firestore.FieldValue.increment(num)

    const dataRef = this.db.collection('misiones').doc(_id)

    dataRef.update({ timeMis: increment })
  }
}






