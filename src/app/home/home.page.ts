import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: string;
  clave: string;

  constructor(private toast:ToastController,
    private router: Router) {}

  limpiar(){
    this.usuario="";
    this.clave="";
  }

  ingresar(){
    let nav:NavigationExtras = {
      state: {usuario: this.usuario}
    }
    if(this.usuario == "alumno" && this.clave == "12345678"){
      this.router.navigate(['/inicio-alumno'], nav)
    }
    if(this.usuario == "profesor" && this.clave == "12345678"){
      this.router.navigate(['/inicio-profesor'], nav)
    }else{
      this.mostrarAlerta("Error, usuario o contraseña incorrecto(s)", 4000)
    
    }
  }

  async mostrarAlerta(mensaje:string, duracion:number){
    const toast = await this.toast.create({
      message: mensaje,
      duration: duracion
    });
    toast.present();
  }

}
