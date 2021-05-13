package com.tecazuay.example.restapi.services;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.RegisterTicketParam;
import com.tecazuay.example.restapi.models.Parametros;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.ParametrosRepository;
import com.tecazuay.example.restapi.repositories.TicketRepository;

@Service
@Validated
public class TicketService {

	private TicketRepository ticketRepository;
	private ParametrosRepository parametrosRepository;

	@Autowired
	public TicketService(TicketRepository ticketRepository, ParametrosRepository parametrosRepository) {
		this.ticketRepository = ticketRepository;
		this.parametrosRepository = parametrosRepository;
	}

	public Ticket createTicket(
			@Valid RegisterTicketParam registerTicket,
			Usuario user
	) {
		Parametros impacto = parametrosRepository.findById(registerTicket.getImpactoId())
				.orElseThrow(() -> new ResourceNotFoundException("The impacto not found, provide a correct id."));
		
		Ticket ticket = new Ticket();
		ticket.setUsuario(user);
		ticket.setTitulo(registerTicket.getTitulo());
		ticket.setDescripcion(registerTicket.getDescripcion());
		ticket.setImpacto(impacto);
		ticket.setEstado(parametrosRepository.findById(Types.PARAMETROS_ESTADO_ABIERTO).get());
		return ticketRepository.save(ticket);
	}
}
