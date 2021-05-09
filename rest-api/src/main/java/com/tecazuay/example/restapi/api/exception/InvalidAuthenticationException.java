package com.tecazuay.example.restapi.api.exception;

public class InvalidAuthenticationException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8805288776424877411L;

	public InvalidAuthenticationException() {
		super("Correo o contraseña incorrectos.");
	}
}
