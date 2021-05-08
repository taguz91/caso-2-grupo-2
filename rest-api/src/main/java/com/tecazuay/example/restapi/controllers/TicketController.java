package com.tecazuay.example.restapi.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecazuay.example.restapi.api.params.RegisterTicketParam;
import com.tecazuay.example.restapi.models.Ticket;
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

	@GetMapping("/all")
	public List<Ticket> getAll() {
		return ticketRepository.findAll();
	}

	@PostMapping("/save")
	public Ticket save(@Valid @RequestBody RegisterTicketParam registerTicket) {
		return ticketService.createTicket(registerTicket);
	}

}
