import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { GuardarPuestosComponent } from '../guardar-puestos/guardar-puestos.component';
import { PuestoEstudiante } from '../model/puesto-estudiante';
import { PuestoEstudianteService } from '../service/puesto-estudiante.service';
import { PuestoService } from '../service/puesto.service';

@Component({
  selector: 'app-gestionar-puestos',
  templateUrl: './gestionar-puestos.component.html',
  styleUrls: ['./gestionar-puestos.component.css']
})
export class GestionarPuestosComponent implements OnInit {

  public listaPuestosOcupados: PuestoEstudiante[] = [];
  public numeroPuestosDisponibles: number = 0;

  constructor(
    private servicePuestoEstudiante: PuestoEstudianteService,
    private servicePuestos: PuestoService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarPuestosOcupados();
    this.numeroPuestos();
  }

  private numeroPuestos(){
    this.servicePuestos.numeroPuestosDisponibles().subscribe(res=>{
      this.numeroPuestosDisponibles= res;
      console.log(this.numeroPuestosDisponibles)
    })
  }

  public modalGestionarEstudiante(id: number) {
    let dialogRef = this.dialog.open(GuardarPuestosComponent, {
      height: '300px',
      width: '500px',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.listarPuestosOcupados();
        this.numeroPuestos();
      }
    });
  }

  public listarPuestosOcupados() {

    this.servicePuestoEstudiante.listarPestosOcupados().subscribe(res => {
      this.listaPuestosOcupados = res;
    }, error => {
      console.log('Ha ocurrido un error al listar los estudiantes');
    })
  }

  public eliminar(puestoEstudiante: PuestoEstudiante) {

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
        this.servicePuestoEstudiante.actualizar(puestoEstudiante).subscribe(res => {
          this.listarPuestosOcupados();
          this.numeroPuestos();
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
