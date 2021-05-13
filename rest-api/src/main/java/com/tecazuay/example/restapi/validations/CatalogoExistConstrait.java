package com.tecazuay.example.restapi.validations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Documented
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CatalogoExistConstraitValidator.class)
public @interface CatalogoExistConstrait {

	String message() default "Servicio no existe.";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
