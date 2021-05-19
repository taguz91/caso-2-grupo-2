package com.tecazuay.example.restapi.api.params;

import javax.validation.constraints.NotNull;

import com.tecazuay.example.restapi.validations.TicketExistConstrait;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class AsignarTicketParam {

	@NotNull(message = "Ticket es requerido.")
	@TicketExistConstrait
	private Long ticketId;

	@NotNull(message = "Soporte es requerido.")
	private Long soporteId;

	public Long getTicketId() {
		return ticketId;
	}

	public void setTicketId(Long ticketId) {
		this.ticketId = ticketId;
	}

	public Long getSoporteId() {
		return soporteId;
	}

	public void setSoporteId(Long soporteId) {
		this.soporteId = soporteId;
	}

}
