package com.tecazuay.example.restapi.services;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.RegisterTicketParam;
import com.tecazuay.example.restapi.models.Historial;
import com.tecazuay.example.restapi.models.Parametros;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.CatalogoRepository;
import com.tecazuay.example.restapi.repositories.HistorialRepository;
import com.tecazuay.example.restapi.repositories.ParametrosRepository;
import com.tecazuay.example.restapi.repositories.TicketRepository;

@Service
@Validated
public class TicketService {

	private TicketRepository ticketRepository;
	private ParametrosRepository parametrosRepository;
	private CatalogoRepository catalogoRepository;
	private EmailServiceImpl emailService;
	private HistorialRepository historialRepository;

	@Autowired
	public TicketService(TicketRepository ticketRepository, ParametrosRepository parametrosRepository,
			CatalogoRepository catalogoRepository, EmailServiceImpl emailService,
			HistorialRepository historialRepository) {
		this.ticketRepository = ticketRepository;
		this.parametrosRepository = parametrosRepository;
		this.catalogoRepository = catalogoRepository;
		this.emailService = emailService;
		this.historialRepository = historialRepository;
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

	public Ticket updateTicket(@Valid RegisterTicketParam registerTicket, Usuario user, Long ticketId) {
		Ticket ticket = ticketRepository.findById(ticketId)
				.orElseThrow(() -> new ResourceNotFoundException("No encontramos el ticket con este id"));

		AuthorizationService.canEditTicket(user, ticket);

		List<Historial> historials = new ArrayList<>();

		if (!ticket.getTitulo().equals(registerTicket.getTitulo())) {

			historials.add(new Historial(
					"Actualizo el titulo: <span>" + ticket.getTitulo() + "</span> " + registerTicket.getTitulo(),
					ticket));
			ticket.setTitulo(registerTicket.getTitulo());
		}

		if (!ticket.getDescripcion().equals(registerTicket.getDescripcion())) {
			historials.add(new Historial("Actualizo la descripción: <span>" + ticket.getDescripcion() + "</span> "
					+ registerTicket.getDescripcion(), ticket));
			ticket.setDescripcion(registerTicket.getDescripcion());
		}

		if (ticket.getImpacto().getParametros_id() != registerTicket.getImpactoId()) {
			Parametros impacto = parametrosRepository.findById(registerTicket.getImpactoId()).get();
			historials.add(new Historial("Actualizo el nivel de impacto: <span>" + ticket.getImpacto().getNombre()
					+ "</span> " + impacto.getNombre(), ticket));
			ticket.setImpacto(impacto);
		}
		// Guardamos todo el historial generado
		this.historialRepository.saveAll(historials);
		return this.ticketRepository.save(ticket);
	}
}
