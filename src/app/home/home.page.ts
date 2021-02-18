import { Component, OnInit } from '@angular/core';
import { AuthService } from "../servicios/auth.service";
import { ReadService } from "../servicios/read.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public arUser: any = []

  constructor(public authservice: AuthService, public readService: ReadService, private AFauth: AngularFireAuth ,private router: Router) { }

  ngOnInit() {
    var _id = this.AFauth.auth.currentUser.uid
    this.readService.fnDataUser().subscribe(user => {
      let usuario = user.filter(usu => usu.uid == _id)
      this.arUser = usuario
    })
  }
  logOut() {
    this.AFauth.auth.signOut().then(auth => {
      this.router.navigate(['/login'])
    })
  }

}
