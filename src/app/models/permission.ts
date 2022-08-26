export interface Permission {
    asset: boolean;
    registerAsset: boolean;
    assignmentAsset: boolean;
    dischargeAsset: boolean;
    departureAsset: boolean;
    extLoanAsset: boolean;
    intLoanAsset: boolean;
    readmision: boolean;
    report: boolean;
    reportGeneral: boolean;
    reportDepreciation: boolean;
    reportAmortization: boolean;
    reportUnits: boolean;
    reportStatus: boolean;
    reportHistorical: boolean;
    catalogue: boolean;
    account: boolean;
    clasification: boolean;
    departament: boolean;
    workStation: boolean;
    brand: boolean;
    provider: boolean;
    segurity: boolean;
    user: boolean;
    role: boolean;
    setting: boolean;

    setPermission(list: any);

    validateList(list: any[], aux: any[]);

    validatePermission(list: any[], modulo: string);
}

export class PermissionModel implements Permission{
    
    
    asset: boolean;
    registerAsset: boolean;
    assignmentAsset: boolean;
    dischargeAsset: boolean;
    departureAsset: boolean;
    extLoanAsset: boolean;
    intLoanAsset: boolean;
    readmision: boolean;
    report: boolean;
    reportGeneral: boolean;
    reportDepreciation: boolean;
    reportAmortization: boolean;
    reportUnits: boolean;
    reportStatus: boolean;
    reportHistorical: boolean;
    catalogue: boolean;
    account: boolean;
    clasification: boolean;
    departament: boolean;
    workStation: boolean;
    brand: boolean;
    provider: boolean;
    segurity: boolean;
    user: boolean;
    role: boolean;
    setting: boolean;
    setPermission(list: any): any {
        let permission = new PermissionModel();

        let activos = ['Activos.Lista', 'Asignaciones.Lista', 'Descargos.Lista', 'Salidas.Lista', 'PréstamosExt.Lista', 'PréstamosInt.Lista', 'Activos.Agregar', 'Asignaciones.Agregar', 'Descargos.Agregar', 'Salidas.Agregar', 'PréstamosExt.Agregar', 'PréstamosInt.Agregar', 'Activos.Editar', 'Asignaciones.Editar', 'Descargos.Editar', 'Salidas.Editar', 'PréstamosExt.Editar', 'PréstamosInt.Editar'];
        let reportes = ['Reportes.General', 'Reportes.Depreciación', 'Reportes.Amortización', 'Reportes.Unidades', 'Reportes.Estados', 'Reportes.Histórico',];
        let catalogos = ['Unidades.Lista', 'Proveedores.Lista', 'Plazas.Lista', 'Marcas.Lista', 'Cuentas.Lista', 'Clasificaciones.Lista', 'Unidades.Agregar', 'Proveedores.Agregar', 'Plazas.Agregar', 'Marcas.Agregar', 'Cuentas.Agregar', 'Clasificaciones.Agregar', 'Unidades.Editar', 'Proveedores.Editar', 'Plazas.Editar', 'Marcas.Editar', 'Cuentas.Editar', 'Clasificaciones.Editar',];
        let seguridad = ['Roles.Lista', 'Usuarios.Lista', 'Roles.Agregar', 'Usuarios.Agregar', 'Roles.Editar', 'Usuarios.Editar',];


        permission.asset = this.validateList(list, activos) ? true : false;
        permission.registerAsset = this.validateList(list, ['Activos.Lista', 'Activos.Agregar', 'Activos.Editar']) ? true : false;
        permission.assignmentAsset = this.validateList(list, ['Asignaciones.Lista', 'Asignaciones.Agregar', 'Asignaciones.Editar']) ? true : false;
        permission.dischargeAsset = this.validateList(list, ['Descargos.Lista', 'Descargos.Agregar', 'Descargos.Editar']) ? true : false;
        permission.departureAsset = this.validateList(list, ['Salidas.Lista', 'Salidas.Agregar', 'Salidas.Editar']) ? true : false;
        permission.extLoanAsset = this.validateList(list, ['PréstamosExt.Lista', 'PréstamosExt.Agregar', 'PréstamosExt.Editar']) ? true : false;
        permission.intLoanAsset = this.validateList(list, ['PréstamosInt.Lista', 'PréstamosInt.Agregar', 'PréstamosInt.Editar']) ? true : false;
        permission.readmision = this.validateList(list, ['Reingresos.Lista', 'Reingresos.Editar']) ? true : false;

        permission.report = this.validateList(list, reportes) ? true : false;
        permission.reportGeneral = this.validateList(list, ['Reportes.General']) ? true : false;
        permission.reportDepreciation = this.validateList(list, ['Reportes.Depreciación']) ? true : false;
        permission.reportAmortization = this.validateList(list, ['Reportes.Amortización']) ? true : false;
        permission.reportUnits = this.validateList(list, ['Reportes.Unidades']) ? true : false;
        permission.reportStatus = this.validateList(list, ['Reportes.Estados']) ? true : false;
        permission.reportHistorical = this.validateList(list, ['Reportes.Histórico']) ? true : false;

        permission.catalogue = this.validateList(list, catalogos) ? true : false;
        permission.account = this.validateList(list, ['Cuentas.Lista', 'Cuentas.Agregar', 'Cuentas.Editar']) ? true : false;
        permission.clasification = this.validateList(list, ['Clasificaciones.Lista', 'Clasificaciones.Agregar', 'Clasificaciones.Editar']) ? true : false;
        permission.departament = this.validateList(list, ['Unidades.Lista', 'Unidades.Agregar', 'Unidades.Editar']) ? true : false;
        permission.workStation = this.validateList(list, ['Plazas.Lista', 'Plazas.Agregar', 'Plazas.Editar']) ? true : false;
        permission.brand = this.validateList(list, ['Marcas.Lista', 'Marcas.Agregar', 'Marcas.Editar']) ? true : false;
        permission.provider = this.validateList(list, ['Proveedores.Lista', 'Proveedores.Agregar', 'Proveedores.Editar']) ? true : false;

        permission.segurity = this.validateList(list, seguridad) ? true : false;
        permission.user = this.validateList(list, ['Usuarios.Lista', 'Usuarios.Agregar', 'Usuarios.Editar']) ? true : false;
        permission.role = this.validateList(list, ['Roles.Lista', 'Roles.Agregar', 'Roles.Editar']) ? true : false;

        permission.setting = this.validateList(list, ['Configuraciones.Lista', 'Configuraciones.Editar']) ? true : false;

        return permission;
    }

    validateList(list: any[], aux: any[]) {
        let enabled = false;
        aux.forEach(obj => {
            list.forEach(element => {
                if(obj == element.name){
                    enabled = true;
                }
            });
        });
        return enabled;
    }



    validatePermission(list: any[], modulo: string): any{
        let newList: any[] = [];        
        list.forEach(obj => {
            if(obj.name.includes(modulo)){
                newList.push(obj);
            }
        });
        return newList;
    }
    
}



