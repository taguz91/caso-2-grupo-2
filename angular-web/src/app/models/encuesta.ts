import { Ticket, Medio } from './medio';
import { TicketView } from './ticket';
import { ParametroModel } from './parametros';
import { Adjunto } from './adjunto';
import { Usuario } from './usuario';
import { Sla } from './catalogo';
export class Encuesta {
  calificacion : number;
  comentarios : string;
  ticketid: number;

  constructor(
    calificacion : number,
    comentarios : string,
    ticketid: number){

      this.calificacion= calificacion;
      this.comentarios= comentarios;
      this.ticketid= ticketid;

  }
}
export interface EncuestaView {
  calificacion : number;
  comentarios : string;
  ticketid: TicketView[];
}
export interface TicketEncuesta {
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

interface Catalogo {
  createdAt: Date;
  updatedAt: Date;
  catalogo_id: number;
  descripcion: string;
  tipoServicio: ParametroModel;
  sla?: Sla;
}



