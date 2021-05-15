package com.tecazuay.example.restapi.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.tecazuay.example.restapi.repositories.ServicioRepository;

public class ServicioExistConstraitValidator implements ConstraintValidator<ServicioExistConstrait, Long> {

	@Autowired
	ServicioRepository servicioRepository;

	@Override
	public boolean isValid(Long value, ConstraintValidatorContext context) {
		if (value == null)
			return false;
		return servicioRepository.findById(value).isPresent();
	}

}
