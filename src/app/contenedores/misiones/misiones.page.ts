import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { ReadService } from "../../servicios/read.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-misiones',
  templateUrl: './misiones.page.html',
  styleUrls: ['./misiones.page.scss'],
})
export class MisionesPage implements OnInit {

  public arUser: any = []
  public arAlumn: any = []
  public arMisiones: any = []
  public arMisionesUser: any = []

  inputCoins: number
  typeGame: string
  idMision: string


  constructor(public authservice: AuthService, public readService: ReadService, private AFauth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit() {
    this.fnDatosProfe()
  }

  fnDatosProfe() {
    var _id = this.AFauth.auth.currentUser.uid
    this.readService.fnDataUser().subscribe(user => {
      let usuario = user.filter(usu => usu.uid == _id)
      this.arUser = usuario
      var cursoProfe = usuario.map(a => a.curso).toString()
      var schoolProfe = usuario.map(a => a.school).toString()
      this.readService.fnDataAlumno().subscribe(doc => {
        let filterCurso = doc.filter(a => a.cursoAlumn == cursoProfe)
        let data = filterCurso.filter(a => a.school == schoolProfe)
        this.arAlumn = data
        this.readService.fnDatosMisiones().subscribe(doc => {
          let filter1 = doc.filter(a => a.school == schoolProfe)
          let filter2 = filter1.filter(a => a.curso == cursoProfe)
          this.arMisiones = filter2
        })
      })
    })
  }

  fnOffBtnOne() {
    document.getElementById('imgGameTwo').hidden = true
    document.getElementById('imgGameThree').hidden = true
    this.typeGame = 'Numeros'
  }

  fnOffBtnTwo() {
    document.getElementById('imgGameOne').hidden = true
    document.getElementById('imgGameThree').hidden = true
    this.typeGame = 'SumaResta'
  }

  fnOffBtnThree() {
    document.getElementById('imgGameTwo').hidden = true
    document.getElementById('imgGameOne').hidden = true
    this.typeGame = 'Quiz'
  }

  fnBTNLimpiar() {
    document.getElementById('imgGameOne').hidden = false
    document.getElementById('imgGameTwo').hidden = false
    document.getElementById('imgGameThree').hidden = false
    this.inputCoins = null
  }

  fnFilterMis() {
    if (this.inputCoins == null || this.inputCoins == undefined || this.inputCoins == 0) {
      alert('Da una recompensa ')
    } else {
      if (this.typeGame == undefined || this.typeGame == null) {
        alert('Selecciona el juego')
      } else {
        this.fnADDMiss()
      }
    }
  }

  fnADDMiss() {
    var _id = this.AFauth.auth.currentUser.uid
    this.readService.fnDataUser().subscribe(user => {
      let usuario = user.filter(usu => usu.uid == _id)
      this.arUser = usuario
      var cursoProfe = usuario.map(a => a.curso).toString()
      var schoolProfe = usuario.map(a => a.school).toString()
      this.readService.fnDataAlumno().subscribe(doc => {
        let filterCurso = doc.filter(a => a.cursoAlumn == cursoProfe)
        let data = filterCurso.filter(a => a.school == schoolProfe)
        this.arAlumn = data
        data.forEach(a => {
          this.db.collection('misiones').add({
            coin: this.inputCoins,
            curso: cursoProfe,
            estado: true,
            lastname: a.apeAlumn,
            name: a.nomAlumn,
            school: schoolProfe,
            tipoJuego: this.typeGame,
            uid: a.uid
          })
        })
      })
    })
  }

  fnDeletMis(misiones) {
    this.db.collection('misiones').doc(misiones.idMis).delete()
  }



}
