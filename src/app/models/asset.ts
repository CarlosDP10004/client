export interface Asset {
    IdCuenta:number;
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
}

export interface Patent {
    IdCuenta:number;
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
    Autor: string;
    Titulo: string;
    Editorial: string;
    Tomo: string;
    Edicion: string;
}

export interface Vehicle {
    IdCuenta:number;
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
}
