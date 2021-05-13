package com.tecazuay.example.restapi.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tecazuay.example.restapi.api.exception.NoAuthorizationException;
import com.tecazuay.example.restapi.api.params.RegisterTicketParam;
import com.tecazuay.example.restapi.definitions.PageResponse;
import com.tecazuay.example.restapi.definitions.TicketsList;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.TicketRepository;
import com.tecazuay.example.restapi.services.AuthorizationService;
import com.tecazuay.example.restapi.services.TicketService;

@RestController
@RequestMapping("/api/v1/ticket")
public class TicketController {

	private TicketService ticketService;

	private TicketRepository ticketRepository;

	@Autowired
	public TicketController(TicketService ticketService, TicketRepository ticketRepository) {
		this.ticketService = ticketService;
		this.ticketRepository = ticketRepository;
	}

	@PostMapping("/save")
	public ResponseEntity<Ticket> save(@Valid @RequestBody RegisterTicketParam registerTicket,
			@AuthenticationPrincipal Usuario user) {
		return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.createTicket(registerTicket, user));
	}

	@GetMapping("/user/home")
	public ResponseEntity<?> ticksUserHome(@AuthenticationPrincipal Usuario user,
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "20") int size) {
		Pageable pageable = PageRequest.of(page, size);

		Page<TicketsList> ticketsPage = ticketRepository.findAllByUserHome(user.getPersonaId(), pageable);

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(new PageResponse(ticketsPage));
	}

	@GetMapping("/estado/{estado}")
	public ResponseEntity<?> ticksCoordinadorHome(@PathVariable Long estado, @AuthenticationPrincipal Usuario user,
			@RequestParam(value = "offset", defaultValue = "0") int offset,
			@RequestParam(value = "limit", defaultValue = "20") int limit) {
		if (!AuthorizationService.canReadTicketsByEstado(user)) {
			throw new NoAuthorizationException();
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(ticketRepository.findAllByEstadoHome(estado));
	}

}
