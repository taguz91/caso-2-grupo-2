package com.tecazuay.example.restapi.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.tecazuay.example.restapi.repositories.TicketRepository;

public class TicketExistConstraitValidator implements ConstraintValidator<TicketExistConstrait, Long> {

	@Autowired
	TicketRepository tickpetRepository;

	@Override
	public boolean isValid(Long value, ConstraintValidatorContext context) {
		if (value == null)
			return false;
		return tickpetRepository.findById(value).isPresent();
	}

}
