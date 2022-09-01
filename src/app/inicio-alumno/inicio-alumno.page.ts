import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
    private router: Router) {

    this.active.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      }
    });
  }


  ngOnInit() {
  }


}
