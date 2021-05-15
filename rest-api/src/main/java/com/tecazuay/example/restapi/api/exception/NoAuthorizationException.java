package com.tecazuay.example.restapi.api.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.FORBIDDEN)
public class NoAuthorizationException extends RuntimeException {

	public NoAuthorizationException() {
		super(defaultErrorMessage(null));
	}

	public NoAuthorizationException(String message) {
		super(defaultErrorMessage(message));
	}

	private static String defaultErrorMessage(String message) {
		if (message == null) {
			return "Unauthorized";
		}
		return message;
	}

}
