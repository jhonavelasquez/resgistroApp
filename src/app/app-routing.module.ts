import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import{LogueadoGuard} from './logueado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicio-profesor',
    loadChildren: () => import('./inicio-profesor/inicio-profesor.module').then( m => m.InicioProfesorPageModule)
  },
  {
    path: 'inicio-alumno',
    loadChildren: () => import('./inicio-alumno/inicio-alumno.module').then( m => m.InicioAlumnoPageModule),
    canActivate: [LogueadoGuard]
  },
  {
    path: 'animacion',
    loadChildren: () => import('./animacion/animacion.module').then( m => m.AnimacionPageModule)
  },  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
