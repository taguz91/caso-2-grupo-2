package com.tecazuay.example.restapi.api.params;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class HistorialParam {
	@NotBlank
	private String accion;
	@NotNull
	private Long ticked_id;

	public String getAccion() {
		return this.accion;
	}

	public void setAccion(String accion) {
		this.accion = accion;
	}

	public Long getTicked_id() {
		return this.ticked_id;
	}

	public void setTicked_id(Long ticked_id) {
		this.ticked_id = ticked_id;
	}

}
