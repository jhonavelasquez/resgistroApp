import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioAlumnoPageRoutingModule } from './inicio-alumno-routing.module';

import { InicioAlumnoPage } from './inicio-alumno.page';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [
    MatProgressBarModule,  
    MatExpansionModule,
    CommonModule,
    FormsModule,
    IonicModule,
    InicioAlumnoPageRoutingModule
  ],
  declarations: [InicioAlumnoPage]
})
export class InicioAlumnoPageModule {}
