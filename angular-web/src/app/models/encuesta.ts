export class Encuesta {
  encuesta_id: number;
  calificacion : number;
  comentario : string;
  ticketid: number;

  constructor(encuesta_id: number,
    calificacion : number,
    comentario : string,
    ticketid: number){

      this.encuesta_id= encuesta_id;
      this.calificacion= calificacion;
      this.comentario= comentario;
      this.ticketid= ticketid;

  }
}
