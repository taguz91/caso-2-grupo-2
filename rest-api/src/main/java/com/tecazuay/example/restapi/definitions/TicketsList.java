package com.tecazuay.example.restapi.definitions;

import java.time.LocalDateTime;

public interface TicketsList {

	Long getTicket_id();

	String getTitulo();

	String getTipo();

	String getEstado();

	LocalDateTime getCreated_at();

}
