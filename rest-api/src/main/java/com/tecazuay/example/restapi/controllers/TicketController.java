package com.tecazuay.example.restapi.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tecazuay.example.restapi.api.params.RegisterTicketParam;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.TicketRepository;
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
	public ResponseEntity<Ticket> save(
			@Valid @RequestBody RegisterTicketParam registerTicket, 
			@AuthenticationPrincipal Usuario user
	) {
		return ResponseEntity.status(HttpStatus.CREATED).body(
				ticketService.createTicket(registerTicket, user)
		);
	}

}
