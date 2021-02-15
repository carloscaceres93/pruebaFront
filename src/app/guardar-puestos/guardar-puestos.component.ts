import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Estudiante } from '../model/estudiante';
import { Puesto } from '../model/puesto';
import { EstudianteService } from '../service/estudiante.service';
import { PuestoService } from '../service/puesto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PuestoEstudiante } from '../model/puesto-estudiante';
import { PuestoEstudianteService } from '../service/puesto-estudiante.service';

@Component({
  selector: 'app-guardar-puestos',
  templateUrl: './guardar-puestos.component.html',
  styleUrls: ['./guardar-puestos.component.css']
})
export class GuardarPuestosComponent implements OnInit {

  public listaEstudiantes: Estudiante[] = [];
  public listaPuestos: Puesto[] = [];

  public formAsignarPuestos: FormGroup;

  constructor(
    private serviceEstudiante: EstudianteService,
    private servicePuestos: PuestoService,
    private servicePuestoEstudiante: PuestoEstudianteService,
    private dialogRef: MatDialogRef<GuardarPuestosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  ngOnInit(): void {
    this.cargarEstudiantes();
    this.cargarPuestos();
    this.initFormAsignarPuesto();
  }

  private cargarEstudiantes() {
    this.serviceEstudiante.listarlistarEstudiantesDisponobles().subscribe(res => {
      this.listaEstudiantes = res;
    }, error => {
      console.log('Error al generar la lista de estudiantes');
    })
  }

  private cargarPuestos() {
    this.servicePuestos.listarPuestosDisponibles().subscribe(res => {
      this.listaPuestos = res;
    }, error=>{
      console.log('Error al generar la lista de puestos');
    })
  }

  private initFormAsignarPuesto(){
    this.formAsignarPuestos = new FormGroup({
      idEstudiante: new FormControl(null, Validators.required),
      idPuesto: new FormControl(null, Validators.required)
    })
  }

  private registrar(puestoEstudiante: PuestoEstudiante) {
    this.servicePuestoEstudiante.registrar(puestoEstudiante).subscribe(res => {
      this.dialogRef.close(true);
      return Swal.fire('Exíto', 'Puesto Asignado', 'success');
    })
  }

  public guardar(){
    let idEstudiante: Estudiante = new Estudiante();
    idEstudiante.id = this.formAsignarPuestos.controls['idEstudiante'].value;

    let idPuesto: Puesto = new Puesto();
    idPuesto.id = this.formAsignarPuestos.controls['idPuesto'].value;

    let puestoEstudiante = new PuestoEstudiante();
    puestoEstudiante.idEstudiante = idEstudiante;
    puestoEstudiante.idPuesto = idPuesto;
    
    this.registrar(puestoEstudiante);

  } 

}
