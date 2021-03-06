export interface Parametro {
  parametros_id: number;
  nombre: string;
  descripcion: string;
}

export interface ParametroModel {
  createdAt: Date;
  updatedAt: Date;
  parametros_id: number;
  type: number;
  nombre: string;
  descripcion: string;
}

export interface CatalogoServicio {
  catalogo_id: number;
  descripcion: string;
}

export interface PageResponse<T> {
  data: T;
  meta: PageMetadata;
}

export interface PageMetadata {
  current: number;
  items: number;
  pages: number;
  perPage: number;
}

export interface FloatingOption {
  icon: string;
  tooltip: string;
  callback: any;
  color?: string;
}
