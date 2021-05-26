import { Categoria } from './categoria';

export interface Servicio {
  servicio_id: number;
  nombre_servicio: string;
  categoria: Categoria;
}

export interface ServicioCombo {
  servicio_id: number;
  nombre: string;
}
