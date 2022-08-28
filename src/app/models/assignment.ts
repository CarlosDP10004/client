export interface Assignment {
    IdUnidad:number;
    JefeUnidad:string;
    IdPlaza:number;
    IdEstado:number;
    IdArchivo:number;
    ListaActivos:any[];

    getAssignment(form: any, archivo: number);
}

export class AssignmentModel implements Assignment{
    IdUnidad: number;
    JefeUnidad: string;
    IdPlaza: number;
    IdEstado: number;
    IdArchivo: number;
    ListaActivos: any[];

    getAssignment(form: any, archivo: number): any {
        let assignment = new AssignmentModel();
        let array: any[] = [];
        assignment.IdUnidad = form.get('IdUnidad').value;
        assignment.JefeUnidad = form.get('JefeUnidad').value;
        assignment.IdPlaza = form.get('IdPlaza').value;
        assignment.IdEstado = form.get('IdEstado').value;
        assignment.IdArchivo = archivo;
        form.get('ListaActivos').value.forEach(element => {
            array.push(element);
        });
        assignment.ListaActivos = array;
        return assignment;
    }
    
}
