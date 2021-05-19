import { Categoria } from "./categoria";

export interface Servicio{

    servicio_id: number;
    nombre_servicio: string;
    categoria: Categoria;
    
}