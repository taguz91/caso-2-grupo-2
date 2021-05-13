package com.tecazuay.example.restapi.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.tecazuay.example.restapi.repositories.ParametrosRepository;

public class ImpactoExistConstraitValidator implements ConstraintValidator<ImpactoExistConstrait, Long> {

	@Autowired
	private ParametrosRepository parametrosRepository;

	@Override
	public void initialize(ImpactoExistConstrait impactoExist) {
	}

	@Override
	public boolean isValid(Long impactoId, ConstraintValidatorContext cxt) {
		if (impactoId == null)
			return false;

		return parametrosRepository.findById(impactoId).isPresent();
	}

}
