export interface TicketForm {
  catalogoId: number;
  impactoId: number;
  titulo: string;
  descripcion: string;
}

export interface TicketHome {
  ticket_id: number;
  titulo: string;
  estado: string;
  tipo: string;
}
