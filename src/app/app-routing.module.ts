import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionarEstuidantesComponent } from './gestionar-estuidantes/gestionar-estuidantes.component';
import { GestionarPuestosComponent } from './gestionar-puestos/gestionar-puestos.component';


const routes: Routes = [
  { path: '', component: GestionarPuestosComponent },
  { path: 'gestionar-estudiantes', component: GestionarEstuidantesComponent },
  {path: 'gestionar-puestos', component: GestionarPuestosComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
