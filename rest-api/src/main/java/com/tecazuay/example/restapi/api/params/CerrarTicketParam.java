package com.tecazuay.example.restapi.api.params;

import javax.validation.constraints.NotNull;

import com.tecazuay.example.restapi.validations.TicketExistConstrait;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class CerrarTicketParam {

	@NotNull(message = "Ticket es requerido.")
	@TicketExistConstrait
	private Long ticketId;

	@NotNull(message = "Solución es requerido.")
	private String solucion;

	@NotNull(message = "Estado es requerido.")
	private Long estado;

	public String getSolucion() {
		return solucion;
	}

	public void setSolucion(String solucion) {
		this.solucion = solucion;
	}

	public Long getEstado() {
		return estado;
	}

	public void setEstado(Long estado) {
		this.estado = estado;
	}

	public Long getTicketId() {
		return ticketId;
	}

	public void setTicketId(Long ticketId) {
		this.ticketId = ticketId;
	}

}
