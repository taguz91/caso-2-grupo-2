package com.tecazuay.example.restapi.validations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = ImpactoExistConstraitValidator.class)
public @interface ImpactoExistConstrait {
	
	String message() default "El impacto no existe.";
	
	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
