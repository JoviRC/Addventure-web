import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';


export interface usuario {
  email: string
  emailComp: string
  password: string
  passCon: string
  name: string
  lastname: string
  school: string
  curso: string
  uid: string
}

export interface alumnos {
  apeAlumn: string
  apeApod:string
  coin:number
  cursoAlumn:string
  exp:number
  imgPerfil:string
  key:string
  level:string
  nomAlumn:string
  nomApod:string
  school:string
  uid:string
}

export interface misiones {
  coin:number
  curso:string
  estado:boolean
  idMis:string
  tipoJuego:string
  uid:string
  name:string
  lastname:string
  school:string
}

export interface recompensas{
  coins:number
  cursoAlumn:string
  estado:boolean
  recomp:string
  school:string
  uid:string
  idRec:string
  name:string
  lastname:string
}

export interface gameThree{
  actividad:string
  altBueno:number
  altMaloDos:number
  altMaloUno:number
  num1:number
  num2:number
  ope:string
  tipoAlt:string
  tipos: string
  uid:number
  idG:string
}
export interface gameOne {
  cantLevelOne: number
  cantLevelTwo:number
  cantLevelThree:number
  contMalas:number
  contTotal:number
  timeTotal:number
  idGame:string
}
export interface gameTwo{
  cantLevelOne: number
  cantLevelTwo:number
  cantLevelThree:number
  contResta:number
  contRestasMalas:number
  contSuma:number
  contSumasMalas:number
  timeTotal:number
  idGame:string
}

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }


  fnDataUser() {
    return this.db.collection('usersProfesor').snapshotChanges().pipe(map(a => {
      return a.map(docs => {
        const data = docs.payload.doc.data() as usuario;
        data.uid = docs.payload.doc.id;
        return data
      })
    }))
  }
  fnDataAlumno(){
    return this.db.collection('usersAlumnos').snapshotChanges().pipe(map(a =>{
      return a.map(doc =>{
        const data = doc.payload.doc.data() as alumnos
        data.uid = doc.payload.doc.id
        return data
      })
    }))
  }

  fnDatosMisiones(){
    return this.db.collection('misiones').snapshotChanges().pipe(map(a =>{
      return a.map(doc =>{
        const data = doc.payload.doc.data() as misiones
        data.idMis = doc.payload.doc.id
        return data
      })
    }))
  }

  fnDataRecompensas(){
    return this.db.collection('recompensas').snapshotChanges().pipe(map(a =>{
      return a.map(doc =>{
        const data = doc.payload.doc.data() as recompensas
        data.idRec = doc.payload.doc.id
        return data
      })
    }))
  }

  fnDataGameThree(){
    return this.db.collection('gameThreeContent').snapshotChanges().pipe(map(a =>{
      return a.map(doc =>{
        const data = doc.payload.doc.data() as gameThree
        data.idG = doc.payload.doc.id
        return data
      })
    }))
  }

  fnDataGameOne(){
    return this.db.collection('gameOne').snapshotChanges().pipe(map(a =>{
      return a.map(doc =>{
        const data = doc.payload.doc.data() as gameOne
        data.idGame = doc.payload.doc.id
        return data
      })
    }))
  }

  fnGameTwo(){
    return this.db.collection('gameTwo').snapshotChanges().pipe(map(a =>{
      return a.map(doc =>{
        const data = doc.payload.doc.data() as gameTwo
        data.idGame = doc.payload.doc.id
        return data
      })
    }))
  }



}

