package com.tecazuay.example.restapi.api.params;

import javax.validation.constraints.NotNull;

import com.tecazuay.example.restapi.validations.TicketExistConstrait;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class RechazarTicketParam {

	@NotNull(message = "Ticket es requerido.")
	@TicketExistConstrait
	private Long ticketId;

	@NotNull(message = "Motivo es requerido.")
	private String motivo;

	public Long getTicketId() {
		return ticketId;
	}

	public void setTicketId(Long ticketId) {
		this.ticketId = ticketId;
	}

	public String getMotivo() {
		return motivo;
	}

	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}

}
