import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // ngModel comonents
  //login
  public email: string
  public password: string
  //Reg Serial
  public key: string
  //Registro

  keyAprobed: boolean = false

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  onSubmintLogin() {
    this.authService.login(this.email, this.password).then(res => {
      this.router.navigate(['home'])
    }).catch(err => alert('los datos son erroneos o no existe el usuario'))
  }
  onSubmitSerial() {
    this.authService.serial = this.key
    this.authService.testSerial(this.key).then(res => {
     this.router.navigate(['registro'])
    }).catch(err => console.log('Serial Caducada o erronea'))
  }

  fnOpenRegisterSerial() {
    var a = document.getElementById('divMenuContentSerial')
    a.style.display = 'block'
    var b = document.getElementById('divMenuContentLogin')
    b.style.display = 'none'
  }
  fnBackRegister() {
    var a = document.getElementById('divMenuContentSerial')
    a.style.display = 'none'
    var b = document.getElementById('divMenuContentLogin')
    b.style.display = 'block'
    var ab = document.getElementById('divMenuContentRegistro')
    ab.style.display = 'none'
  }
  fnOpenRegister() {
    var a = document.getElementById('divMenuContentRegistro')
    a.style.display = 'block'
    var b = document.getElementById('divMenuContentSerial')
    b.style.display = 'none'
  }
}
