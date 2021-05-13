package com.tecazuay.example.restapi.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.tecazuay.example.restapi.repositories.CatalogoRepository;

public class CatalogoExistConstraitValidator implements ConstraintValidator<CatalogoExistConstrait, Long> {

	@Autowired
	CatalogoRepository catalogoRepository;

	@Override
	public boolean isValid(Long value, ConstraintValidatorContext context) {
		if (value == null)
			return false;
		return catalogoRepository.findById(value).isPresent();
	}

}
