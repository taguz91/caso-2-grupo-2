package com.tecazuay.example.restapi.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.AsignarTicketParam;
import com.tecazuay.example.restapi.api.params.CerrarTicketParam;
import com.tecazuay.example.restapi.api.params.RechazarTicketParam;
import com.tecazuay.example.restapi.api.params.RegisterTicketParam;
import com.tecazuay.example.restapi.models.Historial;
import com.tecazuay.example.restapi.models.MedioComunicacion;
import com.tecazuay.example.restapi.models.Parametros;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.CatalogoRepository;
import com.tecazuay.example.restapi.repositories.HistorialRepository;
import com.tecazuay.example.restapi.repositories.ParametrosRepository;
import com.tecazuay.example.restapi.repositories.TicketRepository;
import com.tecazuay.example.restapi.repositories.UsuarioRepository;

@Service
@Validated
public class TicketService {

	private TicketRepository ticketRepository;
	private ParametrosRepository parametrosRepository;
	private CatalogoRepository catalogoRepository;
	private EmailServiceImpl emailService;
	private HistorialRepository historialRepository;
	private UsuarioRepository usuarioRepository;

	@Autowired
	public TicketService(TicketRepository ticketRepository, ParametrosRepository parametrosRepository,
			CatalogoRepository catalogoRepository, EmailServiceImpl emailService,
			HistorialRepository historialRepository, UsuarioRepository usuarioRepository) {
		this.ticketRepository = ticketRepository;
		this.parametrosRepository = parametrosRepository;
		this.catalogoRepository = catalogoRepository;
		this.emailService = emailService;
		this.historialRepository = historialRepository;
		this.usuarioRepository = usuarioRepository;
	}

	public Ticket createTicket(@Valid RegisterTicketParam registerTicket, Usuario user) {
		Parametros impacto = parametrosRepository.findById(registerTicket.getImpactoId()).get();

		Ticket ticket = new Ticket();
		if (registerTicket.getUsuarioId() != 0) {
			Usuario finalUser = usuarioRepository.findById(registerTicket.getUsuarioId())
					.orElseThrow(() -> new ResourceNotFoundException("No encontramos al usuario"));
			ticket.setUsuario(finalUser);
		} else {
			ticket.setUsuario(user);
		}
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
			historials.add(new Historial("Actualizo la descripci??n: <span>" + ticket.getDescripcion() + "</span> "
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

	public Ticket asignarTicket(@Valid AsignarTicketParam asignarTicket, Usuario user) {
		Ticket ticket = ticketRepository.findById(asignarTicket.getTicketId()).get();

		Usuario responsable = usuarioRepository.findById(asignarTicket.getSoporteId())
				.orElseThrow(() -> new ResourceNotFoundException("No encontramos al usuario soporte."));

		List<Historial> historials = new ArrayList<>();

		if (ticket.getResponsable() == null) {
			Parametros estado = parametrosRepository.findById(Types.PARAMETROS_ESTADO_ATENDIENDOSE).get();
			ticket.setEstado(estado);
			ticket.setResponsable(responsable);
			ticket.setFechaAsignacion(LocalDateTime.now());
			historials.add(new Historial("Asignaci??n ticket: " + ticket.getResponsable().getNombreCompleto(), ticket));
		}

		if (!ticket.getResponsable().getPersonaId().equals(responsable.getPersonaId())) {
			historials.add(new Historial("Reasignaci??n ticket: <span>" + ticket.getResponsable().getNombreCompleto()
					+ "</span> " + responsable.getNombreCompleto(), ticket));
			ticket.setResponsable(responsable);
		}

		historialRepository.saveAll(historials);
		return ticketRepository.save(ticket);
	}

	public Ticket cerrarTicket(@Valid CerrarTicketParam cerrarTicket, Usuario user) {
		Ticket ticket = ticketRepository.findById(cerrarTicket.getTicketId()).get();
		Parametros estado = parametrosRepository.findByIdAndType(cerrarTicket.getEstado(), Types.PARAMETROS_ESTADOS)
				.orElseThrow(() -> new ResourceNotFoundException("El estado no es v??lido."));

		ticket.setEstado(estado);
		ticket.setSolucion(cerrarTicket.getSolucion());
		ticket.setResponsableSolucion(user);
		ticket.setFechaSolucion(LocalDateTime.now());
		Historial historial = new Historial("Se cierra el ticket", ticket);

		historialRepository.save(historial);

		if (haveCorreoNotification(ticket)) {
			emailService.sendCerrado(ticket);
		}
		return ticketRepository.save(ticket);
	}

	public Ticket rechazarTicker(RechazarTicketParam rechazarTicket, Usuario user) {
		Ticket ticket = ticketRepository.findById(rechazarTicket.getTicketId()).get();
		Parametros estado = parametrosRepository.findById(Types.PARAMETROS_ESTADO_RECHAZADO).get();

		ticket.setEstado(estado);
		ticket.setSolucion(rechazarTicket.getMotivo());
		ticket.setResponsableSolucion(user);
		ticket.setFechaSolucion(LocalDateTime.now());

		Historial historial = new Historial("Se rechaza el ticket.", ticket);
		historialRepository.save(historial);
		if (haveCorreoNotification(ticket)) {
			emailService.sendRechazo(ticket);
		}
		return ticketRepository.save(ticket);
	}

	private boolean haveCorreoNotification(Ticket ticket) {
		boolean notificar = false;
		for (MedioComunicacion mc : ticket.getMediosComunicacion()) {
			notificar = mc.getMedio().getParametros_id() == Types.MEDIO_COMUNICACION_CORREO;
		}
		return notificar;
	}
}
