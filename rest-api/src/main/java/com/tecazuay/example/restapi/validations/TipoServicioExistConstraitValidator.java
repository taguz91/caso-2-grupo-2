package com.tecazuay.example.restapi.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.repositories.ParametrosRepository;

public class TipoServicioExistConstraitValidator implements ConstraintValidator<TipoServicioExistConstrait, Long> {

	@Autowired
	ParametrosRepository parametroRepository;

	@Override
	public boolean isValid(Long value, ConstraintValidatorContext context) {
		if (value == null)
			return false;

		return parametroRepository.findByIdAndType(value, Types.PARAMETROS_TIPO_SERVICIOS).isPresent();
	}

}
