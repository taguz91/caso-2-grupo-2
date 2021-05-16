import { Rol } from './rol';

export class Usuario {
    personaId: string
    nombres: string
    apellidos: string
    correo: string
    password: string
    token: string
    rol: Rol
}