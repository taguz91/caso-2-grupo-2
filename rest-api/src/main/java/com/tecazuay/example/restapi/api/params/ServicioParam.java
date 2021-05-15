package com.tecazuay.example.restapi.api.params;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.tecazuay.example.restapi.validations.CategoriaExistConstrait;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ServicioParam {

	@NotBlank
	@Pattern(regexp = "[A-Z a-z]+", message = "El nombre del servicio solo puede tener letras")
	private String nombre_servicio;

	@NotNull
	@CategoriaExistConstrait
	private Long categoriaId;

	public String getNombre_servicio() {
		return nombre_servicio;
	}

	public void setNombre_servicio(String nombre_servicio) {
		this.nombre_servicio = nombre_servicio;
	}

	public Long getCategoriaId() {
		return categoriaId;
	}

	public void setCategoriaId(Long categoriaId) {
		this.categoriaId = categoriaId;
	}

}
