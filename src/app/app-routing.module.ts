import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'inicio-profesor',
    loadChildren: () => import('./inicio-profesor/inicio-profesor.module').then( m => m.InicioProfesorPageModule)
  },
  {
    path: 'inicio-alumno',
    loadChildren: () => import('./inicio-alumno/inicio-alumno.module').then( m => m.InicioAlumnoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
