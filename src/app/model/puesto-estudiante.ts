import { Estudiante } from "./estudiante";
import { Puesto } from "./puesto";

export class PuestoEstudiante {
    public id; number;
    public idEstudiante: Estudiante;
    public idPuesto: Puesto;
    public estado: boolean;
}
