import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PuestoEstudiante } from '../model/puesto-estudiante';

@Injectable({
  providedIn: 'root'
})
export class PuestoEstudianteService {

  private path: string = environment.urlApi + '/puestoEstudiante'

  constructor(
    private http: HttpClient
  ) { }


  public listarTodos() {
    return this.http.get<PuestoEstudiante[]>(this.path + '/listarTodos');
  }

  public listarPestosOcupados() {
    return this.http.get<PuestoEstudiante[]>(this.path + '/listarPuestosOcupados')
  }

  public listarPorId(id: number) {
    return this.http.get<PuestoEstudiante>(this.http + '/listarPorId', {
      params: {
        id: id.toString()
      }
    }).pipe(
      catchError(e => {
        Swal.fire("Error", e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  public registrar(puestoestudiante: PuestoEstudiante) {
    return this.http.post<void>(this.path + '/registrar', puestoestudiante).pipe(
      catchError(e => {
        Swal.fire("Error al asignar el puesto", e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public actualizar(puestoestudiante: PuestoEstudiante) {
    return this.http.put<void>(this.path + '/actualizar', puestoestudiante).pipe(
      catchError(e => {
        Swal.fire("Error al actualizar el puesto", e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public eliminar(id: number) {
    return this.http.delete<void>(this.path + '/eliminar', {
      params: {
        "id": id.toString()
      }
    }).pipe(
      catchError(e => {
        Swal.fire("Error al eliminar el puesto", e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}


