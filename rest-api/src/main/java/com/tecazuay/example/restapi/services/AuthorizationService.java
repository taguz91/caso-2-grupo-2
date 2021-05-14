package com.tecazuay.example.restapi.services;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.models.Usuario;

public class AuthorizationService {

	public static boolean canReadTicketsByEstado(Usuario user) {
		return user.getRol().getRolId() == Types.ROL_COORDINADOR || user.getRol().getRolId() == Types.ROL_DEVELOPER;
	}

}
