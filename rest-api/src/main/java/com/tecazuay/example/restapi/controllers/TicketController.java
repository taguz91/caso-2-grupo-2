package com.tecazuay.example.restapi.controllers;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tecazuay.example.restapi.api.exception.NoAuthorizationException;
import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.AdjuntoParam;
import com.tecazuay.example.restapi.api.params.AsignarTicketParam;
import com.tecazuay.example.restapi.api.params.CerrarTicketParam;
import com.tecazuay.example.restapi.api.params.RegisterTicketParam;
import com.tecazuay.example.restapi.definitions.PageResponse;
import com.tecazuay.example.restapi.definitions.TicketsList;
import com.tecazuay.example.restapi.models.Adjunto;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.TicketRepository;
import com.tecazuay.example.restapi.services.AuthorizationService;
import com.tecazuay.example.restapi.services.FileStoreService;
import com.tecazuay.example.restapi.services.TicketService;

@RestController
@RequestMapping("/api/v1/ticket")
public class TicketController {

	private TicketService ticketService;
	private TicketRepository ticketRepository;
	private FileStoreService fileStoreService;

	@Autowired
	public TicketController(TicketService ticketService, TicketRepository ticketRepository,
			FileStoreService fileStoreService) {
		this.ticketService = ticketService;
		this.ticketRepository = ticketRepository;
		this.fileStoreService = fileStoreService;
	}

	@GetMapping("/{ticketId}")
	public ResponseEntity<Ticket> one(@PathVariable Long ticketId, @AuthenticationPrincipal Usuario user) {
		Ticket ticket = ticketRepository.findById(ticketId)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el ticket con este id"));
		// Si el ticket no pertece a la persona solo los siguientes roles pueden verlo
		if (!ticket.getUsuario().getPersonaId().equals(user.getPersonaId())) {
			AuthorizationService.canReadTicket(user);
		}

		return ResponseEntity.status(HttpStatus.OK).body(ticket);
	}

	@PostMapping("/save")
	public ResponseEntity<Ticket> save(@Valid @RequestBody RegisterTicketParam registerTicket,
			@AuthenticationPrincipal Usuario user) {
		AuthorizationService.canCreateTicket(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.createTicket(registerTicket, user));
	}

	@PostMapping("/update/{ticketId}")
	public ResponseEntity<Ticket> update(@PathVariable Long ticketId,
			@Valid @RequestBody RegisterTicketParam registerTicket, @AuthenticationPrincipal Usuario user) {
		return ResponseEntity.status(HttpStatus.OK).body(ticketService.updateTicket(registerTicket, user, ticketId));
	}

	@GetMapping("/user/home")
	public ResponseEntity<?> ticksUserHome(@AuthenticationPrincipal Usuario user,
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "20") int size) {
		if (user == null) {
			throw new NoAuthorizationException("Debe iniciar sessión.");
		}

		Pageable pageable = PageRequest.of(page, size);

		Page<TicketsList> ticketsPage = ticketRepository.findAllByUserHome(user.getPersonaId(), pageable.getOffset(),
				pageable.getPageSize(), pageable);

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(new PageResponse(ticketsPage));
	}

	@GetMapping("/estado/{estado}")
	public ResponseEntity<?> ticksCoordinadorHome(@Valid @PathVariable Long estado,
			@AuthenticationPrincipal Usuario user, @RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "20") int size) {

		AuthorizationService.canReadTicketsByEstado(user);

		Pageable pageable = PageRequest.of(page, size);
		Page<TicketsList> ticketsPage = ticketRepository.findAllByEstadoHome(user.getPersonaId(), pageable.getOffset(),
				pageable.getPageSize(), pageable);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(new PageResponse(ticketsPage));
	}

	@PostMapping(value = "/add/adjunto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Adjunto> saveAdjunto(@RequestParam("file") MultipartFile file,
			@RequestParam("ticketId") Long ticketId) {
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(fileStoreService.saveAdjunto(new AdjuntoParam(ticketId, file)));
	}

	@PostMapping(value = "/asignar")
	public ResponseEntity<Ticket> asignar(@Valid @RequestBody AsignarTicketParam asignar,
			@AuthenticationPrincipal Usuario user) {
		return ResponseEntity.status(HttpStatus.OK).body(ticketService.asignarTicket(asignar, user));
	}

	@PostMapping(value = "/cerrar")
	public ResponseEntity<Ticket> cerrar(@Valid @RequestBody CerrarTicketParam cerrar,
			@AuthenticationPrincipal Usuario user) {
		return ResponseEntity.status(HttpStatus.OK).body(ticketService.cerrarTicket(cerrar, user));
	}

}
