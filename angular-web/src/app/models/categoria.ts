export interface Categoria{
    categoria_id?: number;
    nombre_categoria: string;
}

export interface PageResponse<T>{
    data: T,
    meta: PageMetadata
}

export interface PageMetadata{
    current: number,
    items: number,
    pages: number
}