package com.tecazuay.example.restapi.services;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.api.params.RegisterTicketParam;
import com.tecazuay.example.restapi.models.Parametros;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.CatalogoRepository;
import com.tecazuay.example.restapi.repositories.ParametrosRepository;
import com.tecazuay.example.restapi.repositories.TicketRepository;

@Service
@Validated
public class TicketService {

	private TicketRepository ticketRepository;
	private ParametrosRepository parametrosRepository;
	private CatalogoRepository catalogoRepository;
	private EmailServiceImpl emailService;

	@Autowired
	public TicketService(TicketRepository ticketRepository, ParametrosRepository parametrosRepository,
			CatalogoRepository catalogoRepository, EmailServiceImpl emailService) {
		this.ticketRepository = ticketRepository;
		this.parametrosRepository = parametrosRepository;
		this.catalogoRepository = catalogoRepository;
		this.emailService = emailService;
	}

	public Ticket createTicket(@Valid RegisterTicketParam registerTicket, Usuario user) {
		Parametros impacto = parametrosRepository.findById(registerTicket.getImpactoId()).get();

		Ticket ticket = new Ticket();
		ticket.setUsuario(user);
		ticket.setTitulo(registerTicket.getTitulo());
		ticket.setDescripcion(registerTicket.getDescripcion());
		ticket.setImpacto(impacto);
		ticket.setEstado(parametrosRepository.findById(Types.PARAMETROS_ESTADO_ABIERTO).get());
		ticket.setCatalogo(catalogoRepository.findById(registerTicket.getCatalogoId()).get());
		Ticket newTicket = ticketRepository.save(ticket);

		emailService.sendNewTicket(newTicket);
		return newTicket;
	}
}
