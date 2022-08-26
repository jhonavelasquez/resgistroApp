import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio-profesor',
  templateUrl: './inicio-profesor.page.html',
  styleUrls: ['./inicio-profesor.page.scss'],
})
export class InicioProfesorPage implements OnInit {

  usuario:string;

  constructor(
    private active: ActivatedRoute,
    private router: Router) {

      this.active.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state){
          this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        }
      });
     }

  ngOnInit() {
  }

}
