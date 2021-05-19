export class Encuesta {
  calificacion : number;
  comentarios : string;
  ticketid: string;

  constructor(
    calificacion : number,
    comentarios : string,
    ticketid: string){

      this.calificacion= calificacion;
      this.comentarios= comentarios;
      this.ticketid= ticketid;

  }
}
