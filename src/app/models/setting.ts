export interface Setting {
    Tipo: string;
    Nombre: string;
    Descripcion: string;
    ValorEntero: number;
    IdArchivo: number;
    ValorCadena: string;
    ValorDecimal: number;

    getSetting(form: any, logo: number);
}

export class SettingModel implements Setting{
    Tipo: string;
    Nombre: string;
    Descripcion: string;
    ValorEntero: number;
    IdArchivo: number;
    ValorCadena: string;
    ValorDecimal: number;
    getSetting(form: any, logo: number) {
        let setting = new SettingModel(); 
        setting.Tipo = form.get('Tipo').value;
        setting.Nombre = form.get('Nombre').value;
        setting.Descripcion = form.get('Descripcion').value;
        setting.ValorEntero = (form.get('ValorEntero').value != undefined && form.get('ValorEntero').value != "") ? form.get('ValorEntero').value : null;
        setting.IdArchivo = logo;
        setting.ValorCadena = (form.get('ValorCadena').value != undefined && form.get('ValorCadena').value != "") ? form.get('ValorCadena').value : null;
        setting.ValorDecimal = (form.get('ValorDecimal').value != undefined && form.get('ValorDecimal').value != "") ? form.get('ValorDecimal').value : null;
        return setting;
    }
    
}
