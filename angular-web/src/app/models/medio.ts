import { ParametroModel } from './Parametros';

export interface Medio {
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: any;
  medio_id: number;
  medio: ParametroModel;
}

export interface Ticket {
  ticket_id: number;
  titulo: string;
  descripcion: string;
  solucion: string;
  fechaSolucion: Date;
}

export interface MedioForm {
  ticket_id: number;
  medio_id: number;
}
