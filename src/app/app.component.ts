import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private plataform: Platform,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.plataform.ready().then(()=>{
      this.statusBar.styleDefault();
      this.router.navigateByUrl('animacion');
    })
  }
}
