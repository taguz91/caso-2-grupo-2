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
@Constraint(validatedBy = CorreoExistConstraitValidator.class)
public @interface CorreoExistConstrait {

	String message() default "Ya se registro un usuario con este correo.";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

}
