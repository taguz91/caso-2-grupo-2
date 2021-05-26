import { Adjunto } from './adjunto';
import { Sla } from './catalogo';
import { Medio } from './medio';
import { ParametroModel } from './Parametros';
import { Usuario } from './usuario';

export interface TicketForm {
  catalogoId: number;
  impactoId: number;
  titulo: string;
  descripcion: string;
  usuarioId: number;
}

export interface AsignarForm {
  ticketId: number;
  soporteId: number;
}

export interface CerrarForm {
  ticketId: number;
  solucion: string;
  estado: number;
}

export interface RechazarForm {
  ticketId: number;
  motivo: string;
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
  sla?: Sla;
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
  fechaAsignacion?: Date;
  estado: ParametroModel;
  impacto: ParametroModel;
  listaHistorial: any[];
  encuesta?: any;
  adjuntos: Adjunto[];
  responsable?: Usuario;
  responsableSolucion?: Usuario;
  catalogo: Catalogo;
  mediosComunicacion: Medio[];
  usuario: Usuario;
}

export interface TicketCount {
  nombre: string;
  total: number;
}

export interface TicketCountEstado {
  day: number;
  total: number;
  estado_id: number;
}
