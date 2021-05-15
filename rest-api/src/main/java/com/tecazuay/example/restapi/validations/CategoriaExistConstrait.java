package com.tecazuay.example.restapi.validations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;

import com.amazonaws.services.iotevents.model.Payload;

@Documented
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CategoriaExistConstraitValidator.class)
public @interface CategoriaExistConstrait {

	String message() default "Categoria no existe.";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

}
