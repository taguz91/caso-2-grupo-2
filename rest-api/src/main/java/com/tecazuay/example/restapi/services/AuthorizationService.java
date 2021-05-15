package com.tecazuay.example.restapi.services;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.api.exception.NoAuthorizationException;
import com.tecazuay.example.restapi.models.Usuario;

public class AuthorizationService {

	public static boolean canReadTicketsByEstado(Usuario user) {
		if (user == null)
			return true;

		boolean auth = user.getRol().getRolId() == Types.ROL_COORDINADOR
				|| user.getRol().getRolId() == Types.ROL_DEVELOPER;
		if (!auth) {
			throw new NoAuthorizationException("No puedes ver los tickets por estado con tu rol actual.");
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
