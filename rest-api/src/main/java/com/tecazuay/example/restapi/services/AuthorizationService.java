package com.tecazuay.example.restapi.services;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.api.exception.NoAuthorizationException;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.models.Usuario;

public class AuthorizationService {

	public static boolean canReadTicketsByEstado(Usuario user) {
		boolean auth = false;
		if (user != null) {
			auth = user.getRol().getRolId() == Types.ROL_COORDINADOR || user.getRol().getRolId() == Types.ROL_DEVELOPER;
		}

		if (!auth) {
			throw new NoAuthorizationException("No puedes ver los tickets por estado con tu rol actual.");
		}
		return auth;
	}

	public static boolean canCreateTicket(Usuario user) {
		boolean auth = false;
		if (user != null) {
			auth = user.getRol().getRolId() == Types.ROL_USUARIO || user.getRol().getRolId() == Types.ROL_DEVELOPER
					|| user.getRol().getRolId() == Types.ROL_COORDINADOR;
		}
		if (!auth) {
			throw new NoAuthorizationException("No puedes crear un ticket con tu rol actual.");
		}
		return auth;
	}

	public static boolean canReadTicket(Usuario user) {
		boolean auth = false;
		if (user != null) {
			auth = user.getRol().getRolId() == Types.ROL_DEVELOPER || user.getRol().getRolId() == Types.ROL_COORDINADOR
					|| user.getRol().getRolId() == Types.ROL_SOPORTE_N1
					|| user.getRol().getRolId() == Types.ROL_SOPORTE_N2;
		}
		if (!auth) {
			throw new NoAuthorizationException("No puedes leer el ticket con tu rol actual.");
		}
		return auth;
	}

	public static boolean canEditTicket(Usuario user, Ticket ticket) {
		boolean auth = false;
		if (user != null) {
			Long ticketUser = ticket.getUsuario().getPersonaId();
			auth = user.getPersonaId().equals(ticketUser);
		}
		if (!auth) {
			throw new NoAuthorizationException("No puedes actualizar el ticket, no se encuentra en tus registros.");
		}
		return auth;
	}

	public static boolean onlyCoordinadorOrDev(Usuario user) {
		if (user == null)
			return true;

		boolean auth = user.getRol().getRolId() == Types.ROL_COORDINADOR
				|| user.getRol().getRolId() == Types.ROL_DEVELOPER;
		if (!auth) {
			throw new NoAuthorizationException(
					"Debes ser un coordinador o desarrollador para tener acceso a este recurso.");
		}
		return auth;
	}

	public static boolean onlyAdminOrDev(Usuario user) {
		if (user == null)
			return true;

		boolean auth = user.getRol().getRolId() == Types.ROL_ADMIN || user.getRol().getRolId() == Types.ROL_DEVELOPER;
		if (!auth) {
			throw new NoAuthorizationException(
					"Debes ser un administrador o desarrollador para tener acceso a este recurso.");
		}
		return auth;
	}

}
