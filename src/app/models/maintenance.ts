export interface Maintenance {
    IdActivoFijo: number;
    Motivo: string;
    EsRevalorizable: boolean;
    VidaUtil: number;
    Revalorizacion: number;
    Costo: number;
    Observaciones: string;
    IdArchivo: number;

    getMaintenance(form: any, id: number);
    _getMaintenance(form: any, file: number);
}

export class MaintenanceModel implements Maintenance{
    
    
    IdActivoFijo: number;
    Motivo: string;
    EsRevalorizable: boolean;
    VidaUtil: number;
    Revalorizacion: number;
    Costo: number;
    Observaciones: string;
    IdArchivo: number;
    getMaintenance(form: any, idAsset: any) {
        let maintenance = new MaintenanceModel();   
        maintenance.IdActivoFijo = idAsset;
        maintenance.Motivo = form.get('Motivo').value;
        maintenance.VidaUtil = null;
        maintenance.Revalorizacion = null;
        maintenance.EsRevalorizable = null;
        maintenance.Costo = null;
        maintenance.Observaciones = null;
        maintenance.IdArchivo = null;    

        return maintenance;
    }

    _getMaintenance(form: any, file: number) {
        let maintenance = new MaintenanceModel();   
        maintenance.IdActivoFijo = form.get('IdActivoFijo').value;
        maintenance.Motivo = form.get('Motivo').value;
        maintenance.VidaUtil = form.get('VidaUtil').value;
        maintenance.EsRevalorizable = form.get('EsRevalorizable').value;
        maintenance.Revalorizacion = form.get('Revalorizacion').value;
        maintenance.Costo = form.get('Costo').value;
        maintenance.Observaciones = form.get('Observaciones').value;
        maintenance.IdArchivo = file;    
        return maintenance;
    }

}
