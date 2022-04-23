export interface Asset {
    IdCuenta:number;
    IdClasificacion: number;
    IdEstado:number;
    IdMarca: string;
    Modelo: string;
    Descripcion: string;
    IdOrigen: number;
    ValorCompra: number;
    FechaCompra: Date;
    IdArchivo: number;
    Serie: string;
    IdProveedor: number;
    LibreGestion: string;
    IdFotografia: number;
    Placa: string;
    Color: string;
    NoMotor: string;
    NoVIN: string;
    NoChasis: string;
    NoAsientos: number;
    Anno: number;
    Autor: string;
    Titulo: string;
    Editorial: string;
    Tomo: string;
    Edicion: string;

    getAsset(form: any, photo: number, file: number);
}

export class AssetModel implements Asset{
    IdCuenta: number;
    IdClasificacion: number;
    IdEstado:number;
    IdMarca: string;
    Modelo: string;
    Descripcion: string;
    IdOrigen: number;
    ValorCompra: number;
    FechaCompra: Date;
    IdArchivo: number;
    Serie: string;
    IdProveedor: number;
    LibreGestion: string;
    IdFotografia: number;
    Placa: string;
    Color: string;
    NoMotor: string;
    NoVIN: string;
    NoChasis: string;
    NoAsientos: number;
    Anno: number;
    Autor: string;
    Titulo: string;
    Editorial: string;
    Tomo: string;
    Edicion: string;

    getAsset(form: any, photo: number, file: number): any {
        let asset = new AssetModel();        
        /*if(form.hasOwnProperty('IdEstado')){
            asset.IdEstado = (form.get('IdEstado').value != undefined && form.get('IdEstado').value != "") ? form.get('IdEstado').value : null;
        }*/
        asset.IdEstado = form.controls.hasOwnProperty('IdEstado') ? form.get('IdEstado').value : 0;
        asset.IdCuenta = form.get('IdCuenta').value;
        asset.IdClasificacion = form.get('IdClasificacion').value;
        asset.IdMarca = form.get('IdMarca').value;
        asset.Modelo = form.get('Modelo').value;
        asset.Descripcion = form.get('Descripcion').value;
        asset.IdOrigen = form.get('IdOrigen').value;
        asset.ValorCompra = form.get('ValorCompra').value;
        asset.FechaCompra = form.get('FechaCompra').value;
        asset.IdArchivo = file;
        asset.Serie = form.get('Serie').value;
        asset.IdProveedor = form.get('IdProveedor').value;
        asset.LibreGestion = form.get('LibreGestion').value;
        asset.IdFotografia = photo;
        asset.Placa = (form.get('Placa').value != undefined && form.get('Placa').value != "") ? form.get('Placa').value : null;
        asset.Color = (form.get('Color').value != undefined && form.get('Color').value != "") ? form.get('Color').value : null;
        asset.NoMotor = (form.get('NoMotor').value != undefined && form.get('NoMotor').value != "") ? form.get('NoMotor').value : null;
        asset.NoVIN = (form.get('NoVIN').value != undefined && form.get('NoVIN').value != "") ? form.get('NoVIN').value : null;
        asset.NoChasis = (form.get('NoChasis').value != undefined && form.get('NoChasis').value != "") ? form.get('NoChasis').value : null;
        asset.NoAsientos = (form.get('NoAsientos').value != undefined && form.get('NoAsientos').value != "") ? form.get('NoAsientos').value : null;
        asset.Anno = (form.get('Anno').value != undefined && form.get('Anno').value != "") ? form.get('Anno').value : null;
        asset.Autor = (form.get('Autor').value != undefined && form.get('Autor').value != "") ? form.get('Autor').value : null;
        asset.Titulo = (form.get('Titulo').value != undefined && form.get('Titulo').value != "") ? form.get('Titulo').value : null;
        asset.Editorial = (form.get('Editorial').value != undefined && form.get('Editorial').value != "") ? form.get('Editorial').value : null;
        asset.Tomo = (form.get('Tomo').value != undefined && form.get('Tomo').value != "") ? form.get('Tomo').value : null;
        asset.Edicion = (form.get('Edicion').value != undefined && form.get('Edicion').value != "") ? form.get('Edicion').value : null;

       return asset;
    }

    
    
}

function validateValue(stru: any, val: string) {
    let aux = (stru.get(val).value != undefined && stru.get(val).value != "") ? stru.get(val).value : null;
    return aux;
}

