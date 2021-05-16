import { Rol } from './rol';

export class Usuario {
    personaId: bigint
    nombres: string
    apellidos: string
    correo: string
    password: string
    token: string
    rol: Rol
}