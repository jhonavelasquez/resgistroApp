import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-inicio-alumno',
  templateUrl: './inicio-alumno.page.html',
  styleUrls: ['./inicio-alumno.page.scss'],
})
export class InicioAlumnoPage implements OnInit, AfterViewInit, OnDestroy {
  
  result = null;
  usuario: string;
  panelOpenState = false;
  imagen: string;
  scanActive = false;
  asistencias = [];
  private db: SQLiteObject;

  constructor(
    private active: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private sqlite: SQLite) {

    this.active.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      }
    
    this.sqlite.create({
        name: 'data2.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          db.executeSql('create table asistencia(asignatura VARCHAR(32), fecha VARCHAR(90))', [])
            .then(() => this.listar())
            .catch(e => this.listar());
      
      
      
        })
        .catch(e => console.log(e));
      
    
    });
  }

  //QR
  // async leerQr() {
  //   document.querySelector('body').classList.add('scanner-active');
  //   await BarcodeScanner.checkPermission({ force: true });
  //   BarcodeScanner.hideBackground();

  //   const result = await BarcodeScanner.startScan();
  //   if (result.hasContent) {
  //     this.result = result.content;
  //   }
  // }
  
  ngAfterViewInit(){
    BarcodeScanner.prepare();
  }

  ngOnDestroy() {
    BarcodeScanner.stopScan();
  }
  
  //Scanner QR
  // async leerQR (){
  //   const allowed = await this.checkPermission();
  //   if (allowed) {
  //     this.scanActive = true;
  //     const result = await BarcodeScanner.startScan();
  //     console.log("a",result)
  //     this.result = result.content;
  //     this.scanActive = false;
  //     if (result.hasContent){
  //       this.result = result.content;
  //       const fechaDate = new Date()
  //       const fechaString = fechaDate.toISOString().substring(0, 10);
  //       this.db.executeSql('INSERT INTO asistencia VALUES(?,?)', [this.result, fechaString]).then(() => {
  //         console.log("Asistencia agregada!")
  //       }).catch(e => console.log(e));  
  //       this.scanActive = false; 
  //     } 
  //   }
    
  // }

  // async checkPermission(){
  //   return new Promise(async (resolve, reject) => {
  //     const status = await BarcodeScanner.checkPermission({ force: true});
  //     if (status.granted){
  //       resolve(true);
  //     } else if (status.denied){
  //       const alert = await this.alertController.create({
  //         header: 'no permission',
  //         message: 'Please allow camera acces in your settings',
  //         buttons: [{
  //           text: 'No',
  //           role: 'cancel'
  //         },
  //         {
  //           text: 'Open settings',
  //           handler: () => {
  //               BarcodeScanner.openAppSettings();
  //               resolve(false);
  //           }
  //         }] 
  //       });
  //       await alert.present();
  //     } else {
  //       resolve(false)
  //     }
    
  //   });
  // }

  // detener(){
  //   BarcodeScanner.stopScan();
  //   this.scanActive = false;
  // }

  //alertas
  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async info(texto: string) {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: texto,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // async detener() {
  //   BarcodeScanner.showBackground();
  //   BarcodeScanner.stopScan();
  //   document.querySelector('body').classList.remove('scanner-active');
  // };

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


  

  //listarasistencia
  listar(){
    this.db.executeSql('select * from asistencia', [])
          .then((data) => {
            this.asistencias = []
            for(let i = 0; i < data.rows .length; i++){
            this.asistencias.push(data.rows.item(i))
            }
            this.info(JSON.stringify(this.asistencias))
          })
          .catch(e => this.info(e));
  }

  ngOnInit() {
  }


}
