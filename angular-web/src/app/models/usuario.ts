import { Rol } from './rol';

export class Usuario {
    personaId: bigint
    nombres: string
    apellidos: string
    correo: string
    telefono: string
    password: string
    token: string
    rol: Rol
}

export interface LoginForm {
    message?: string;
    errors?: LoginFormErrors;
}

interface LoginFormErrors {
    correo: string[];
    password: string[];
}

export interface LoginUser {
    apellidos: string;
    nombre: string;
    correo: string;
    rol: string;
    token: string;
    type: number;
}
