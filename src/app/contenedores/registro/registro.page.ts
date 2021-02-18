import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router } from "@angular/router";
import { rejects } from 'assert';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public email: string
  public emailComp: string
  public password: string
  public passCon: string
  public name: string
  public lastname: string
  public school: string
  public curso: string


  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit() {

  }

  OnSubmitRegister() {
    if (this.email != this.emailComp || this.emailComp == undefined || this.email == undefined) {
      var a1 = document.getElementById('correo')
      var a2 = document.getElementById('correo2')
      a1.style.backgroundColor = 'rgb(255, 124, 124)'
      a2.style.backgroundColor = 'rgb(255, 124, 124)'
      setTimeout(() => {
        this.email = undefined
        this.emailComp = undefined
        a1.style.backgroundColor = 'rgb(255, 255, 255)'
        a2.style.backgroundColor = 'rgb(255, 255, 255)'
      }, 500);
    } else {
      if (this.password !== this.passCon || this.password == undefined || this.passCon == undefined) {
        var c1 = document.getElementById('clave')
        var c2 = document.getElementById('clave2')
        c1.style.backgroundColor = 'rgb(255, 124, 124)'
        c2.style.backgroundColor = 'rgb(255, 124, 124)'
        setTimeout(() => {
          this.password = undefined
          this.passCon = undefined
          c1.style.backgroundColor = 'rgb(255, 255, 255)'
          c2.style.backgroundColor = 'rgb(255, 255, 255)'
        }, 500);
      } else {
        this.auth.register(this.email, this.emailComp, this.password, this.passCon, this.name, this.lastname, this.school, this.curso)
          .then(auth => {
            this.auth.updateSerial()
            this.auth.logOut()
            this.router.navigate(['/home'])
          }).catch(err => alert('Error al ingresar los datos'))
      }
    }








  }



}
