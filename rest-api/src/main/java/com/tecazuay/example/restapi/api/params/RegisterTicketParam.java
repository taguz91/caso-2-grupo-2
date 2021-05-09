package com.tecazuay.example.restapi.api.params;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class RegisterTicketParam {

	@NotBlank
	private Long impactoId;

	@NotBlank
	private String titulo;

	@NotBlank
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

}
