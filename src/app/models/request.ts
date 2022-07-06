export interface Request {
    Tipo: string;
    IdUnidad: number;
    Solicitante: string;
    Motivo: string;
    FechaSolicitud: Date;
    FechaAprobacion: Date;
    IdEstadoSolicitado: number;
    IdArchivo: number;
    IdUnidadActual: number;
    JefeUnidadActual: string;
    FechaRetorno: Date;
    IdUnidadDestino: number;
    JefeUnidadDestino: string;
    DUI: string;
    Direccion: string;
    Telefono: string;
    Correo: string;
    ListaActivos:any[];

    getRequest(form: any, file: number);
    _getRequest(form: any, file: number, array: any[]);
}

export class RequestModel implements Request{ 
    Tipo: string;
    IdUnidad: number;
    Solicitante: string;
    Motivo: string;
    FechaSolicitud: Date;
    FechaAprobacion: Date;
    IdEstadoSolicitado: number;
    IdArchivo: number;

    IdUnidadActual: number;
    JefeUnidadActual: string;
    FechaRetorno: Date;
    IdUnidadDestino: number;
    JefeUnidadDestino: string;
    DUI: string;
    Direccion: string;
    Telefono: string;
    Correo: string;
    ListaActivos:any[];

    getRequest(form: any, file: number): any {
        let request = new RequestModel(); 
        let array: any[] = [];
        request.Tipo = form.get('Tipo').value;
        request.IdUnidad = form.get('IdUnidad').value;
        request.Solicitante = form.get('Solicitante').value;
        request.Motivo = form.get('Motivo').value;
        request.FechaSolicitud = form.get('FechaSolicitud').value;
        request.IdEstadoSolicitado = form.get('IdEstadoSolicitado').value;
        request.IdArchivo = file;
        form.get('ListaActivos').value.forEach(element => {
            array.push(element);
        });
        request.ListaActivos = array;
        
        return request;
    }

    _getRequest(form: any, file: number, array: any[]): any {
        let request = new RequestModel(); 
        request.Tipo = form.get('Tipo').value;
        request.IdUnidad = (form.get('IdUnidad').value != undefined && form.get('IdUnidad').value != "") ? form.get('IdUnidad').value : null;
        request.Solicitante = form.get('Solicitante').value;
        request.Motivo = form.get('Motivo').value;
        request.FechaSolicitud = form.get('FechaSolicitud').value;
        request.IdEstadoSolicitado = form.get('IdEstadoSolicitado').value;
        request.IdArchivo = file;
        request.IdUnidadActual = (form.get('IdUnidadActual').value != undefined && form.get('IdUnidadActual').value != "") ? form.get('IdUnidadActual').value : null;
        request.JefeUnidadActual = (form.get('JefeUnidadActual').value != undefined && form.get('JefeUnidadActual').value != "") ? form.get('JefeUnidadActual').value : null;
        request.FechaRetorno = (form.get('FechaRetorno').value != undefined && form.get('FechaRetorno').value != "") ? form.get('FechaRetorno').value : null;
        request.IdUnidadDestino = (form.get('IdUnidadDestino').value != undefined && form.get('IdUnidadDestino').value != "") ? form.get('IdUnidadDestino').value : null;
        request.JefeUnidadDestino = (form.get('JefeUnidadDestino').value != undefined && form.get('JefeUnidadDestino').value != "") ? form.get('JefeUnidadDestino').value : null;
        request.DUI = (form.get('DUI').value != undefined && form.get('DUI').value != "") ? form.get('DUI').value : null;
        request.Direccion = (form.get('Direccion').value != undefined && form.get('Direccion').value != "") ? form.get('Direccion').value : null;
        request.Telefono = (form.get('Telefono').value != undefined && form.get('Telefono').value != "") ? form.get('Telefono').value : null;
        request.Correo = (form.get('Correo').value != undefined && form.get('Correo').value != "") ? form.get('Correo').value : null;        

        /*array.forEach(element => {
            list.push(element);
        });*/
        request.ListaActivos = array;
        
        return request;
    }

}
