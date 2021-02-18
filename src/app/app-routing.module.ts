import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NologinGuard } from "./guards/nologin.guard";
import { GameoneGuard } from "./guards/gameone.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate : [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./contenedores/login/login.module').then( m => m.LoginPageModule), canActivate : [NologinGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./contenedores/registro/registro.module').then( m => m.RegistroPageModule), canActivate : [NologinGuard]
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./contenedores/alumnos/alumnos.module').then( m => m.AlumnosPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'misiones',
    loadChildren: () => import('./contenedores/misiones/misiones.module').then( m => m.MisionesPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'recompensas',
    loadChildren: () => import('./contenedores/recompensas/recompensas.module').then( m => m.RecompensasPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'graficos',
    loadChildren: () => import('./contenedores/graficos/graficos.module').then( m => m.GraficosPageModule), canActivate : [AuthGuard]
  },
  {
    path: 'addgametres',
    loadChildren: () => import('./contenedores/addgametres/addgametres.module').then( m => m.AddgametresPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
