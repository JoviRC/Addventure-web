import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { ReadService } from "../../servicios/read.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-addgametres',
  templateUrl: './addgametres.page.html',
  styleUrls: ['./addgametres.page.scss'],
})
export class AddgametresPage implements OnInit {

  public arUser: any = []
  public arAlumn: any = []
  public arRecomp: any = []
  public arGame: any = []
  public pack_data = []
  public random: number

  selectAlt: string
  operador: string

  inputNumOne: number
  inputNumTwo: number

  tipoEncu: string

  tipoAlt: string

  inputAlt1: number
  inputAlt2: number
  inputAlt3: number

  constructor(public authservice: AuthService, public readService: ReadService, private AFauth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit() {
    this.fnDatosProfe()
    this.fnReadGames()
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
fnReadGames(){
  this.readService.fnDataGameThree().subscribe(g =>{
    this.arGame = g
  })
}

  limpiarinputs() {
    this.inputNumOne = undefined
    this.inputNumTwo = undefined
    this.tipoEncu = undefined
    this.tipoAlt = undefined
    this.inputAlt1 = undefined
    this.inputAlt2 = undefined
    this.inputAlt3 = undefined
  }

  fngenerateuid() {
    //test Suma
    if (this.selectAlt == 'Suma') {
      if (this.inputNumOne == null || this.inputNumOne == null || this.inputNumTwo == undefined || this.inputNumTwo == null) {
        alert('Ingrese los numeros enunciados')
      } else {
        var sum = this.inputNumOne + this.inputNumTwo
        if (sum > 9) {
          alert('La suma es superior a 9')
        } else {
          if (this.tipoEncu == undefined || this.tipoEncu == null) {
            alert('Seleccione un tipo de enunciado')
          } else {
            if (this.tipoAlt == undefined || this.tipoAlt == null) {
              alert('Seleccione el tipo de Alternativa')
            } else {
              this.inputAlt1 = this.inputNumOne + this.inputNumTwo
              if (this.inputAlt2 == undefined || this.inputAlt2 == null || this.inputAlt3 == undefined || this.inputAlt3 == null) {
                alert('Ingrese Alternativas falsas')
              } else {
                if (this.inputAlt2 == this.inputAlt1 || this.inputAlt3 == this.inputAlt1) {
                  alert('una alternativa erronea es igual a la alternativa coeecta')
                } else {
                  this.fnaddgame()
                  alert('JUEGO AGREGADO')
                  this.btnClear()
                }
              }
            }
          }
        }
      }
    }

    // Test Resta

    if (this.selectAlt == 'Resta') {
      if (this.inputNumOne == null || this.inputNumOne == null || this.inputNumTwo == undefined || this.inputNumTwo == null) {
        alert('Ingrese los numeros enunciados')
      } else {
        var rest = this.inputNumOne - this.inputNumTwo
        if (rest < 1) {
          alert('resta menor a 1 ')
        } else {
          if (this.tipoEncu == undefined || this.tipoEncu == null) {
            alert('Seleccione un tipo de enunciado')
          } else {
            if (this.tipoAlt == undefined || this.tipoAlt == null) {
              alert('Seleccione el tipo de Alternativa')
            } else {
              this.inputAlt1 = this.inputNumOne - this.inputNumTwo
              if (this.inputAlt2 == undefined || this.inputAlt2 == null || this.inputAlt3 == undefined || this.inputAlt3 == null) {
                alert('Ingrese Alternativas falsas')
              } else {
                if (this.inputAlt2 == this.inputAlt1 || this.inputAlt3 == this.inputAlt1) {
                  alert('una alternativa erronea es igual a la alternativa coeecta')
                } else {
                  this.fnaddgame()
                  alert('JUEGO AGREGADO')
                  this.btnClear()
                }
              }
            }
          }
        }
      }
    }
    // test Contar

    if (this.selectAlt == 'Contar') {
      this.inputNumTwo = 0
      this.operador = ''
      if (this.inputNumOne == null || this.inputNumOne == undefined) {
        alert('Enunciado Incompleto')
      } else {
        if (this.tipoEncu == null || this.tipoEncu == undefined) {
          alert('Tipo enunciado no seleccionado')
        } else {
          if (this.tipoAlt == null || this.tipoAlt == undefined) {
            alert('Tipo de alternativa no seleccionado')
          } else {
            this.inputAlt1 = this.inputNumOne
            if (this.inputAlt2 == null || this.inputAlt2 == undefined || this.inputAlt3 == null || this.inputAlt3 == undefined) {
              alert('Rellene las alternativas INCORRECTAS')
            } else {
              if (this.inputAlt1 == this.inputAlt2 || this.inputAlt1 == this.inputAlt3) {
                alert('Alternativa Incorrecta es Correcta')
              } else {
                this.fnaddgame()
                alert('JUEGO AGREGADO')
                this.btnClear()
              }
            }
          }
        }
      }
    }
    // test Number

    if (this.selectAlt == 'Numero') {
      this.inputNumTwo = 0
      this.operador = ''
      this.tipoEncu = 'Numero'
      this.tipoAlt = 'Animales'
      if (this.inputNumOne == null || this.inputNumOne == undefined) {
        alert('Ingrese el Enunciado')
      } else {
        this.inputAlt1 = this.inputNumOne
        if (this.inputAlt2 == null || this.inputAlt2 == undefined || this.inputAlt3 == null || this.inputAlt3 == undefined) {
          alert('Rellene las alternativas INCORRECTAS')
        } else {
          if (this.inputAlt1 == this.inputAlt2 || this.inputAlt1 == this.inputAlt3) {
            alert('Alternativa Incorrecta es Correcta')
          } else {
            this.fnaddgame()
            alert('JUEGO AGREGADO')
            this.btnClear()
          }
        }
      }
    }

  }

  fnaddgame() {
    this.db.firestore.collection('gameThreeContent')
      .get()
      .then(res => {
        this.pack_data = [];
        res.forEach(datax => {
          this.pack_data.push({ id: datax.id });
        });
        this.random = this.pack_data.length + 1
        //Aqui va la funcion// 
        this.createGame(this.random)
      })
      .catch(err => {
        alert("ERROR " + err)
      })
  }

  fnSelectNum() {
    if (this.selectAlt == 'Suma') {
      document.getElementById('divcontentgameSuma').style.display = 'grid'
      document.getElementById('divcontentgameResta').style.display = 'none'
      document.getElementById('divcontentgameContar').style.display = 'none'
      document.getElementById('divcontentgameNumeros').style.display = 'none'
      document.getElementById('divSelectGame').style.display = 'none'
      this.operador = '+'
      this.limpiarinputs()
    }
    if (this.selectAlt == "Resta") {
      document.getElementById('divcontentgameSuma').style.display = 'none'
      document.getElementById('divcontentgameResta').style.display = 'grid'
      document.getElementById('divcontentgameContar').style.display = 'none'
      document.getElementById('divcontentgameNumeros').style.display = 'none'
      document.getElementById('divSelectGame').style.display = 'none'
      this.operador = '-'
      this.limpiarinputs()
    }
    if (this.selectAlt == "Contar") {
      document.getElementById('divcontentgameSuma').style.display = 'none'
      document.getElementById('divcontentgameResta').style.display = 'none'
      document.getElementById('divcontentgameContar').style.display = 'grid'
      document.getElementById('divcontentgameNumeros').style.display = 'none'
      document.getElementById('divSelectGame').style.display = 'none'
      this.limpiarinputs()
    }
    if (this.selectAlt == "Numero") {
      document.getElementById('divcontentgameSuma').style.display = 'none'
      document.getElementById('divcontentgameResta').style.display = 'none'
      document.getElementById('divcontentgameContar').style.display = 'none'
      document.getElementById('divcontentgameNumeros').style.display = 'grid'
      document.getElementById('divSelectGame').style.display = 'none'
      this.limpiarinputs()
    }
    document.getElementById('btsmit').style.display = 'block'
    document.getElementById('btlclear').style.display = 'block'

  }
  btnClear() {
    document.getElementById('divcontentgameSuma').style.display = 'none'
    document.getElementById('divcontentgameResta').style.display = 'none'
    document.getElementById('divcontentgameContar').style.display = 'none'
    document.getElementById('divcontentgameNumeros').style.display = 'none'
    document.getElementById('divSelectGame').style.display = 'block'

    document.getElementById('btsmit').style.display = 'none'
    document.getElementById('btlclear').style.display = 'none'
  }
  createGame(uid: number) {
    this.db.collection('gameThreeContent').add({
      actividad: this.selectAlt,
      altBueno: this.inputAlt1,
      altMaloUno: this.inputAlt2,
      altMaloDos: this.inputAlt3,
      num1: this.inputNumOne,
      num2: this.inputNumTwo,
      ope: this.operador,
      tipoAlt: this.tipoAlt,
      tipos: this.tipoEncu,
      uid: uid
    }).catch(err => alert('Error al ingresar datos ' + err))
  }
  fnDeletGame(gameThree){
    this.db.collection('gameThreeContent').doc(gameThree.idG).delete()
  }


}
