export interface Request {
    Tipo: string;
    IdUnidad: number;
    Solicitante: string;
    Motivo: string;
    FechaSolicitud: Date;
    FechaAprobacion: Date;
    IdEstadoSolicitado: number;
    IdArchivo: number;
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
        let list: any[] = [];
        request.Tipo = form.get('Tipo').value;
        request.IdUnidad = form.get('IdUnidad').value;
        request.Solicitante = form.get('Solicitante').value;
        request.Motivo = form.get('Motivo').value;
        request.FechaSolicitud = form.get('FechaSolicitud').value;
        request.IdEstadoSolicitado = form.get('IdEstadoSolicitado').value;
        request.IdArchivo = file;
        /*array.forEach(element => {
            list.push(element);
        });*/
        request.ListaActivos = array;
        
        return request;
    }

}
