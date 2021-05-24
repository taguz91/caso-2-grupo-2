export interface CatalogoForm {
  descripcion: string;
  servicio_id: number;
  tipo_servicio_id: number;
  impacto: number;
  criticidad: number;
  nivelPrioridad: number;
  reglasEscalada: string;
  tiempoRespuesta: string;
  timpoSolucion: string;
}
