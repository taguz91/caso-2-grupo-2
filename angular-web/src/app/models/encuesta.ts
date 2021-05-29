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


export class EncuestaView {
  calificacion : number;
  comentario : string;
  ticketid: number;

  constructor(
    calificacion : number,
    comentarios : string,
    ticketid: number){

      this.calificacion= calificacion;
      this.comentario= comentarios;
      this.ticketid= ticketid;

  }
}
