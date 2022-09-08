import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})
export class InicioAlumnoPage implements OnInit {

  usuario: string;
  panelOpenState = false;

  constructor(
    private active: ActivatedRoute,
    private router: Router,
    private alertController : AlertController) {

    this.active.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      }
    });
  }
  
    async alertaQr() {
    const alert = await this.alertController.create({
      header: 'Escaner codigo QR',
      message: `<img src="https://img.freepik.com/vector-premium/escaneo-codigos-qr-escaneame-leer-codigo-barras-movilidad-aplicacion-generacion-codificacion-reconocimiento-iconos-o-lectura-codigo-qr-estilo-plano_399089-1628.jpg?w=2000" alt="g-maps" style="border-radius: 2px">`,
      cssClass: 'custom-alert',
      buttons: ['Cancelar'],
    });

    await alert.present();
  }
  
  ngOnInit() {
  }

  

}
