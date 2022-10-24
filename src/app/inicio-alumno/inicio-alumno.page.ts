import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})
export class InicioAlumnoPage implements OnInit {

  usuario: string;
  panelOpenState = false;
  imagen: string;

  constructor(
    private active: ActivatedRoute,
    private router: Router,
    private alertController: AlertController) {

    this.active.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      }
    });
  }

  //QR
  async leerQr(){
    document.querySelector('body').classList.add('scanner-active');
    await BarcodeScanner.checkPermission({ force: true });
  BarcodeScanner.hideBackground();

  const result = await BarcodeScanner.startScan(); 
  if (result.hasContent) {
    console.log(result.content); 
  }
  }

  async presentAlert(mensaje:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async detener(){
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
      document.querySelector('body').classList.remove('scanner-active');
    };

    //camara
  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;
    this.imagen = imageUrl;

  }

  ngOnInit() {
  }

  

}
