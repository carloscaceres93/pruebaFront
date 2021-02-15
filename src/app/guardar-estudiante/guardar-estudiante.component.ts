import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../model/estudiante';
import { EstudianteService } from '../service/estudiante.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guardar-estudiante',
  templateUrl: './guardar-estudiante.component.html',
  styleUrls: ['./guardar-estudiante.component.css']
})
export class GuardarEstudianteComponent implements OnInit {

  public formEstudiante: FormGroup;

  constructor(
    private serviceEstudiante: EstudianteService,
    public dialogRef: MatDialogRef<GuardarEstudianteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }

  ) { }

  ngOnInit(): void {
    this.iniFormEstudiante();
    this.cargarDatosEdicion();
  }


  private iniFormEstudiante() {
    this.formEstudiante = new FormGroup({
      numeroIdentificacion: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required)
    });
  }

  private registrar(estudiante: Estudiante) {
    this.serviceEstudiante.registrar(estudiante).subscribe(res => {
      this.dialogRef.close(true);
      return Swal.fire('Nuevo Cliente', 'Cliente creado con exíto', 'success');
    })
  }

  private actualizar(estudiante: Estudiante) {
    this.serviceEstudiante.actualizar(estudiante).subscribe(res => {
      this.dialogRef.close(true);
      return Swal.fire('Exito', 'Cliente actualizado con exíto', 'success');
    })
  }

  private cargarDatosEdicion() {
    if (this.data.id != 0) {
      this.serviceEstudiante.listarPorId(this.data.id).subscribe(res => {

        this.formEstudiante.setValue({
          nombre: res.nombre,
          telefono: res.telefono
        });
      }, error => {
        console.log("Ha ocurrido un error al cargar la lista en el modal", error);
      })
    }
  }

  public guardarOrActualizar() {

    let estudiante: Estudiante = new Estudiante();

    estudiante.numeroIdentificacion = this.formEstudiante.controls['numeroIdentificacion'].value;
    estudiante.nombre = this.formEstudiante.controls['nombre'].value;
    estudiante.apellido = this.formEstudiante.controls['apellido'].value;
    estudiante.telefono = this.formEstudiante.controls['telefono'].value;

    if (this.data.id != 0) {
      estudiante.id = this.data.id;
      this.actualizar(estudiante);
    } else {
      this.registrar(estudiante);
    }
  }
}
