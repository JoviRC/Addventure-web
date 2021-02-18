import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { ReadService } from "../../servicios/read.service";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  public arUser: any = []
  public arAlumn: any = []


  constructor(public authservice: AuthService, public readService: ReadService, private AFauth: AngularFireAuth) { }

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


}
