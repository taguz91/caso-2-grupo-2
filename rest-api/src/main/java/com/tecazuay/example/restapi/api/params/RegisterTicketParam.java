package com.tecazuay.example.restapi.api.params;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.tecazuay.example.restapi.validations.CatalogoExistConstrait;
import com.tecazuay.example.restapi.validations.ImpactoExistConstrait;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class RegisterTicketParam {

	@NotNull(message = "Impacto es requerido.")
	@ImpactoExistConstrait
	private Long impactoId;

	@NotNull(message = "Servicio es requerido.")
	@CatalogoExistConstrait
	private Long catalogoId;

	@NotBlank(message = "Titulo es obligatorio")
	private String titulo;

	@NotBlank(message = "Descripción es obligatoria")
	private String descripcion;

	public Long getImpactoId() {
		return impactoId;
	}

	public void setImpactoId(Long impactoId) {
		this.impactoId = impactoId;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Long getCatalogoId() {
		return catalogoId;
	}

	public void setCatalogoId(Long catalogoId) {
		this.catalogoId = catalogoId;
	}

}
