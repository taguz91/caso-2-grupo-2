import { SpawnSyncOptionsWithStringEncoding } from "child_process";

export interface Medio {
  medio_id: number;  
  
  ticket:Ticket
}
export interface Ticket {
  ticket_id: number;
  titulo: string;
  descripcion: string
  solucion:string
  fechaSolucion:Date
}