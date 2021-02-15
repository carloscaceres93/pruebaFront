import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestionarPuestosComponent } from './gestionar-puestos/gestionar-puestos.component';
import { GestionarEstuidantesComponent } from './gestionar-estuidantes/gestionar-estuidantes.component';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatDialogModule} from '@angular/material/dialog';
import { GuardarEstudianteComponent } from './guardar-estudiante/guardar-estudiante.component';
import {MatInputModule} from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms';
import { GuardarPuestosComponent } from './guardar-puestos/guardar-puestos.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    GestionarPuestosComponent,
    GestionarEstuidantesComponent,
    GuardarEstudianteComponent,
    GuardarPuestosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot() ,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
