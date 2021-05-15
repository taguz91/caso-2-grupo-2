package com.tecazuay.example.restapi.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.tecazuay.example.restapi.repositories.CategoriaRepository;

public class CategoriaExistConstraitValidator implements ConstraintValidator<CategoriaExistConstrait, Long> {

	@Autowired
	CategoriaRepository categoriaRepository;

	@Override
	public boolean isValid(Long value, ConstraintValidatorContext context) {
		if (value == null)
			return false;
		return categoriaRepository.findById(value).isPresent();
	}

}
