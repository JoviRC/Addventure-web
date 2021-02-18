import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { ReadService } from "../../servicios/read.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.page.html',
  styleUrls: ['./recompensas.page.scss'],
})
export class RecompensasPage implements OnInit {

  public arUser: any = []
  public arAlumn: any = []
  public arRecomp:any=[]

  inputRec: string
  inputCoins: number

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
        this.readService.fnDataRecompensas().subscribe(doc => {
          let filter1 = doc.filter(a => a.school == schoolProfe)
          let filter2 = filter1.filter(a => a.cursoAlumn == cursoProfe)
          this.arRecomp = filter2
        })
      })
    })
  }

  fnFilterMis() {
    if (this.inputCoins == null || this.inputCoins == undefined || this.inputCoins == 0) {
      alert('Da una recompensa ')
    } else {
      if (this.inputRec == undefined || this.inputRec == null) {
        alert('Selecciona el juego')
      } else {
        this.fnADDRes()
      }
    }
  }
  fnBtnClin(){
    this.inputRec = null
    this.inputCoins= null
  }

  fnADDRes() {
    var _id = this.AFauth.auth.currentUser.uid
    this.readService.fnDataUser().subscribe(user => {
      let usuario = user.filter(usu => usu.uid == _id)
      var cursoProfe = usuario.map(a => a.curso).toString()
      var schoolProfe = usuario.map(a => a.school).toString()
      this.readService.fnDataAlumno().subscribe(doc => {
        let filterCurso = doc.filter(a => a.cursoAlumn == cursoProfe)
        let data = filterCurso.filter(a => a.school == schoolProfe)
        data.forEach(a => {
          this.db.collection('recompensas').add({
            coins: this.inputCoins,
            cursoAlumn: cursoProfe,
            estado:true,
            recomp: this.inputRec,
            school: schoolProfe,
            uid:a.uid,
            name: a.nomAlumn,
            lastname: a.apeAlumn
          })
        })
      })
    })
  }

  fnDeletRec(recompensas){
    this.db.collection('recompensas').doc(recompensas.idRec).delete()
  }

}
