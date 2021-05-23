import { Adjunto } from './adjunto';
import { Usuario } from './usuario';

export interface TicketForm {
  catalogoId: number;
  impactoId: number;
  titulo: string;
  descripcion: string;
}

export interface AsignarForm {
  ticketId: number;
  soporteId: number;
}

export interface TicketHome {
  ticket_id: number;
  titulo: string;
  estado: string;
  tipo: string;
  created_at: Date;
}

// Para ver el ticket

interface Catalogo {
  createdAt: Date;
  updatedAt: Date;
  catalogo_id: number;
  descripcion: string;
  tipoServicio: ParametroModel;
  sla?: any;
}

export interface TicketView {
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy?: number;
  ticket_id: number;
  titulo: string;
  descripcion: string;
  solucion?: string;
  fechaSolucion?: Date;
  estado: ParametroModel;
  impacto: ParametroModel;
  listaHistorial: any[];
  encuesta?: any;
  adjuntos: Adjunto[];
  responsable?: Usuario;
  responsableSolucion?: any;
  catalogo: Catalogo;
  mediosComunicacion: any[];
  usuario: Usuario;
}

interface ParametroModel {
  createdAt: Date;
  updatedAt: Date;
  parametros_id: number;
  type: number;
  nombre: string;
  descripcion: string;
}

export interface TicketCount {
  nombre: string;
  total: number;
}
