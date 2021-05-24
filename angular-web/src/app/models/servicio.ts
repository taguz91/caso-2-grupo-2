import { Categoria } from './categoria';

export interface Servicio {
  servicio_id: number;
  nombre_servicio: string;
  categoria: Categoria;
}

export interface PageResponse<T> {
  data: T;
  meta: PageMetadata;
}

export interface PageMetadata {
  current: number;
  items: number;
  pages: number;
}

export interface ServicioCombo {
  servicio_id: number;
  nombre: string;
}
