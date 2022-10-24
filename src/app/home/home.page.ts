import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationExtras, Router, RouterStateSnapshot } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: string;
  clave: string;
  hide = true;
  private db: SQLiteObject;
  constructor(
    private toast: ToastController,
    private router: Router,
    private sqlite: SQLite,
  ) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql('create table alumno(nombre VARCHAR(32), clave VARCHAR(32))', [])
          .then(() => console.log('Tabla alumno creada'))
          .catch(e => console.log(e));
        //registro usuaio
        this.db.executeSql('INSERT INTO alumno VALUES(?,?)', ['alumno','123456']).then(() => {
          console.log("Insert ejecutado!")
        }).catch(e => console.log(e));  
    
    
      })
      .catch(e => console.log(e));
    
  
  }
  

  limpiar() {
    this.usuario = "";
    this.clave = "";
  }

  async mostrarAlerta(mensaje: string, duracion: number) {
    const toast = await this.toast.create({
      message: mensaje,
      duration: duracion
    });
    toast.present();
  }

  //sqlite 
  insertar() {
    this.db.executeSql('INSERT INTO usuario VALUES(?)', ['alumno']).then(() => {
      console.log("Insert ejecutado!")
    }).catch(e => console.log(e));
  }

  select() {
    this.db.executeSql('SELECT * FROM alumno ', []).then((data) => {
      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i).nombre;
        console.log(item)
      }
    })
  }

  validarLogin(){
    let nav: NavigationExtras = {
      state: { usuario: this.usuario }
    }
    
    this.db.executeSql('SELECT * FROM alumno WHERE ? = nombre and ? = clave', [this.usuario, this.clave]).then((data) => {
      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i).nombre;
        console.log("funco")
        localStorage.setItem("logueado","true")
        this.router.navigate(['/inicio-alumno'], nav)
      }
    })
    this.db.executeSql('SELECT * FROM alumno WHERE ? != nombre or ? != clave', [this.usuario, this.clave]).then((data) => {
      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i).nombre;
        console.log("no funco")
        this.mostrarAlerta("Error, usuario o contraseña incorrecto(s)", 3000)
      }
    })
  }
  
}