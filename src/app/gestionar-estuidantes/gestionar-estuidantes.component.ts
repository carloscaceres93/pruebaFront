import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GuardarEstudianteComponent } from '../guardar-estudiante/guardar-estudiante.component';
import { Estudiante } from '../model/estudiante';
import { EstudianteService } from '../service/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-estuidantes',
  templateUrl: './gestionar-estuidantes.component.html',
  styleUrls: ['./gestionar-estuidantes.component.css']
})
export class GestionarEstuidantesComponent implements OnInit {

  public listaEstudiante: Estudiante[] = [];

  constructor(
    private serviceEstudiante: EstudianteService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.listarEstudiantes();
  }

  public modalGestionarEstudiante(id: number) {
    let dialogRef = this.dialog.open(GuardarEstudianteComponent, {
      height: '700px',
      width: '800px',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.listarEstudiantes();
      }
    });
  }


  public listarEstudiantes() {

    this.serviceEstudiante.listarTodos().subscribe(res => {
      this.listaEstudiante = res;
    }, error => {
      console.log('Ha ocurrido un error al listar los estudiantes');
    })
  }

  public eliminar(id: number) {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Seguro que desea elimiar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceEstudiante.eliminar(id).subscribe(res => {
          this.listarEstudiantes();
          Swal.fire(
            'Eliminado!',
            'registro eliminado con exito',
            'success'
          )
        })
      }
    })
  }
}
