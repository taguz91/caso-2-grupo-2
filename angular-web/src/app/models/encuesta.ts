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
