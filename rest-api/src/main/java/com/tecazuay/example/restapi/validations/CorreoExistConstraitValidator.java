package com.tecazuay.example.restapi.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.tecazuay.example.restapi.repositories.UsuarioRepository;

public class CorreoExistConstraitValidator implements ConstraintValidator<CorreoExistConstrait, String> {

	@Autowired
	UsuarioRepository usuarioRepository;

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null)
			return false;
		return !usuarioRepository.findByCorreo(value).isPresent();
	}

}