package com.tecazuay.example.restapi.services;

import java.util.Date;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.tecazuay.example.restapi.models.Historial;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.HistorialRepository;

@Service
public class EmailServiceImpl implements EmailService {

	private static final String EMAIL_HTML_TEMPLATE_REGISTER = "html/registro";
	private static final String EMAIL_HTML_TEMPLATE_NEW_TICKET = "html/new_ticket";
	private static final String EMAIL_HTML_TEMPLATE_RECHAZO_TICKET = "html/rechazado_ticket";
	private static final String EMAIL_HTML_TEMPLATE_CERRAR_TICKET = "html/cerrado_ticket";

	@Autowired
	private JavaMailSender emailSender;

	@Autowired
	@Qualifier("myEmailTemplate")
	private TemplateEngine htmlTemplateEngine;

	@Autowired
	private HistorialRepository historialRepository;

	@Override
	public void sendWelcome(String to) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("Bienvenido a Tirtec");
		message.setText("Bienvenido gracias por registrarte en nuestro sitio.");

		emailSender.send(message);
	}

	public boolean sendRegister(Usuario user) {
		// Prepare the evaluation context
		final Context ctx = new Context();
		ctx.setVariable("nombre", user.getNombreCompleto());
		ctx.setVariable("fecha", new Date());

		final MimeMessage mimeMessage = this.emailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
		try {
			message.setSubject("Bienvenido a la plataforma Tirtec");
			message.setTo(user.getCorreo());

			final String htmlContent = this.htmlTemplateEngine.process(EMAIL_HTML_TEMPLATE_REGISTER, ctx);
			message.setText(htmlContent, true);

			this.emailSender.send(mimeMessage);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public boolean sendNewTicket(Ticket ticket) {
		// Prepare the evaluation context
		final Context ctx = new Context();
		ctx.setVariable("nombreUsuario", ticket.getUsuario().getNombreCompleto());
		ctx.setVariable("fecha", new Date());
		ctx.setVariable("ticket", ticket.getTicket_id());
		ctx.setVariable("servicio", ticket.getCatalogo().getDescripcion());

		final MimeMessage mimeMessage = this.emailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
		try {
			message.setSubject("Nuevo ticket registrado #" + ticket.getTicket_id());
			message.setTo(ticket.getUsuario().getCorreo());
			final String htmlContent = this.htmlTemplateEngine.process(EMAIL_HTML_TEMPLATE_NEW_TICKET, ctx);
			message.setText(htmlContent, true);
			this.emailSender.send(mimeMessage);

			Historial historial = new Historial(
					"Notificamos ingreso del ticket al correo: " + ticket.getUsuario().getCorreo(), ticket);
			historialRepository.save(historial);

			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public boolean sendRechazo(Ticket ticket) {
		// Prepare the evaluation context
		final Context ctx = new Context();
		ctx.setVariable("nombreUsuario", ticket.getUsuario().getNombreCompleto());
		ctx.setVariable("fecha", new Date());
		ctx.setVariable("ticket", ticket.getTicket_id());
		ctx.setVariable("servicio", ticket.getCatalogo().getDescripcion());
		ctx.setVariable("userRechazo", ticket.getResponsableSolucion().getNombreCompleto());
		ctx.setVariable("motivo", ticket.getSolucion());

		final MimeMessage mimeMessage = this.emailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
		try {
			message.setSubject("Ticket rechazado #" + ticket.getTicket_id());
			message.setTo(ticket.getUsuario().getCorreo());
			final String htmlContent = this.htmlTemplateEngine.process(EMAIL_HTML_TEMPLATE_RECHAZO_TICKET, ctx);
			message.setText(htmlContent, true);
			this.emailSender.send(mimeMessage);

			Historial historial = new Historial(
					"Notificamos rechazo del ticket por correo: " + ticket.getUsuario().getCorreo(), ticket);
			historialRepository.save(historial);

			return true;
		} catch (Exception e) {
			Historial historial = new Historial(
					"No notificamos el rechazo del ticket por correo: " + ticket.getUsuario().getCorreo(), ticket);
			historialRepository.save(historial);
			return false;
		}
	}

	public boolean sendCerrado(Ticket ticket) {
		// Prepare the evaluation context
		final Context ctx = new Context();
		ctx.setVariable("nombreUsuario", ticket.getUsuario().getNombreCompleto());
		ctx.setVariable("fecha", new Date());
		ctx.setVariable("ticket", ticket.getTicket_id());
		ctx.setVariable("servicio", ticket.getCatalogo().getDescripcion());
		ctx.setVariable("estado", ticket.getEstado().getNombre());
		ctx.setVariable("userCierre", ticket.getResponsableSolucion().getNombreCompleto());
		ctx.setVariable("solucion", ticket.getSolucion());

		final MimeMessage mimeMessage = this.emailSender.createMimeMessage();
		final MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
		try {
			message.setSubject("Ticket rechazado #" + ticket.getTicket_id());
			message.setTo(ticket.getUsuario().getCorreo());
			final String htmlContent = this.htmlTemplateEngine.process(EMAIL_HTML_TEMPLATE_CERRAR_TICKET, ctx);
			message.setText(htmlContent, true);
			this.emailSender.send(mimeMessage);

			Historial historial = new Historial(
					"Notificamos cierre del ticket por correo: " + ticket.getUsuario().getCorreo(), ticket);
			historialRepository.save(historial);
			return true;
		} catch (Exception e) {
			Historial historial = new Historial(
					"No pudimos notificar el cierre del ticket por correo: " + ticket.getUsuario().getCorreo(), ticket);
			historialRepository.save(historial);
			return false;
		}
	}

}
