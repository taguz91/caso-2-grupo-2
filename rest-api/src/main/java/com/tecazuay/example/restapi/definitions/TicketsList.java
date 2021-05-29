package com.tecazuay.example.restapi.definitions;

import java.time.LocalDateTime;

public interface TicketsList {

	Long getTicket_id();

	String getTitulo();

	String getTipo();

	String getEstado();
	
	Long getEstado_id();

	LocalDateTime getCreated_at();

}
