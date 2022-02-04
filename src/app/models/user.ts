
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
    Roles: Role[];
}

export interface Role{
    NombreRol: string
}