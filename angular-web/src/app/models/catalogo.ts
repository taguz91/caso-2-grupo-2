import { Criticidad } from './criticidad';
import { ParametroModel } from './Parametros';
import { Servicio } from './servicio';

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

export interface Sla {
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: any;
  sla_id: number;
  tiempoResolucion: string;
  tiempoRespuesta: string;
  reglasEscalada: string;
  criticidad: Criticidad;
  impacto: ParametroModel;
  nivelPrioridad: ParametroModel;
}

export interface CatalogoView {
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: any;
  catalogo_id: number;
  descripcion: string;
  tipoServicio: ParametroModel;
  sla: Sla;
  servicio: Servicio;
}

export interface CatalogoViewFull {
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: any;
  catalogo_id: number;
  descripcion: string;
  tipoServicio: ParametroModel;
  sla: Sla;
  servicio: Servicio;
}
