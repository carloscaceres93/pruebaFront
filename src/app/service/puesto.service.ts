import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Puesto } from '../model/puesto';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  private path: string = environment.urlApi + '/puestos';

  constructor(
    private http: HttpClient,
  ) { }

  public listarPuestosDisponibles() {
    return this.http.get<Puesto[]>(this.path + '/listapuestosDisponibles');
  }

  public numeroPuestosDisponibles() {
    return this.http.get<number>(this.path + '/numeroPuestosDisponibles');
  }
}
