import { Rol } from './rol';

export class Usuario {
  personaId: number;
  cedula: string
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  password: string;
  token: string;
  nombreCompleto?: string;
  rol: Rol;
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
  nombres: string;
  correo: string;
  rol: string;
  token: string;
  type: number;
}

export interface ComboUsuario {
  usuario_id: string;
  nombre_completo: string;
}
