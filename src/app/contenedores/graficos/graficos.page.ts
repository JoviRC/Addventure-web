import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { ReadService } from "../../servicios/read.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit {

  public arUser: any = []
  public arAlumn: any = []
  public arDatosGameOne: any []
  public arDatosGameTwo: any[]

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
      })
    })
  }
  
  fnReadGameOne(alumnos){
    document.getElementById('divTableDatosGameOne').style.display = 'block'
    document.getElementById('divTableDatosGameTwo').style.display = 'none'
    this.readService.fnDataGameOne().subscribe(gOne=>{
      let gOneF = gOne.filter(a => a.idGame == alumnos.uid)
      this.arDatosGameOne = gOneF
    })

  }

  fnReadGameTwo(alumnos){
    document.getElementById('divTableDatosGameOne').style.display = 'none'
    document.getElementById('divTableDatosGameTwo').style.display = 'block'
    this.readService.fnGameTwo().subscribe(gTwo=>{
      let gT = gTwo.filter(a=> a.idGame == alumnos.uid)
      this.arDatosGameTwo = gT
    })
  }
  
}
