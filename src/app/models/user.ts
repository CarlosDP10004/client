
export interface User{
    NombreUsuario: string;
    Contrasenna: string;
}

export interface UserResponse{
    message: string;
    access_token: string;
    token_type: string;
}


export interface Usuario{
    NombreUsuario: string;
    Contrasenna: string; 
    IdEmpleado: number;
    Roles: Role[];
}

export interface UsuarioPermission{
    NombreUsuario: string;
    Contrasenna: string; 
    IdEmpleado: number;
    Permisos: Permiso[];
}

export interface Role{
    NombreRol: string
}

export interface Permiso{
    NombrePermiso: string
}