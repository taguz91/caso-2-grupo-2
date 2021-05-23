export interface Parametro {
  parametros_id: number;
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
}

export interface FloatingOption {
  icon: string;
  tooltip: string;
  callback: any;
}
