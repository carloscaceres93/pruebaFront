import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../model/estudiante';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  path: string = environment.urlApi + '/estudiantes'
  constructor(
    private http: HttpClient,
  ) { }

  public listarTodos() {
    return this.http.get<Estudiante[]>(this.path + '/listarTodos');
  }

  public listarlistarEstudiantesDisponobles(){
    return this.http.get<Estudiante[]>(this.path + '/listarEstudiantesDisponibles');
  }

  public listarPorId(id: number) {
    return this.http.get<Estudiante>(this.path + "/listarPorId", {
      params: {
        "id": id.toString()
      }
    }).pipe(
      catchError(e => {
        Swal.fire("Error al obtener el estudiate", e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public registrar(estudiante: Estudiante) {
    return this.http.post<void>(this.path + '/registrar', estudiante).pipe(
      catchError(e => {
        Swal.fire("Error al registrar el estudiante", e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public actualizar(estudiante: Estudiante) {
    return this.http.put<void>(this.path + '/actualizar', estudiante).pipe(
      catchError(e => {
        Swal.fire("Error al actualizar el estudiante", e.error.mensaje, 'error');
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
        Swal.fire("Error al eliminar el estudiante", e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
