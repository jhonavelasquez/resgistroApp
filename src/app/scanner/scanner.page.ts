import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { SQLite , SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
 
  result = null;
  scanActive = false;
  private db: SQLiteObject;
  constructor(
    private alertController: AlertController,
    private sqlite: SQLite) { }

  ngOnInit() {
  }
  
  //Scanner QR
  async leerQR (){
    const allowed = await this.checkPermission();
    if (allowed) {
      this.scanActive = true;
      const result = await BarcodeScanner.startScan();
      console.log("a",result)
      this.result = result.content;
      this.scanActive = false;
      if (result.hasContent){
        this.result = result.content;
        const fechaDate = new Date()
        const fechaString = fechaDate.toISOString().substring(0, 10);
        this.db.executeSql('INSERT INTO asistencia VALUES(?,?)', [this.result, fechaString]).then(() => {
          console.log("Asistencia agregada!")
        }).catch(e => console.log(e));  
        this.scanActive = false; 
      } 
    }
  }

  async checkPermission(){
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true});
      if (status.granted){
        resolve(true);
      } else if (status.denied){
        const alert = await this.alertController.create({
          header: 'Permiso no concedido',
          message: 'Porfavor permita el acceso a la camara en ajustes.',
          buttons: [{
            text: 'No',
            role: 'cancelar'
          },
          {
            text: 'Abrir ajustes',
            handler: () => {
                BarcodeScanner.openAppSettings();
                resolve(false);
            }
          }] 
        });
        await alert.present();
      } else {
        resolve(false)
      }
    
    });
  }

  detener(){
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

}
