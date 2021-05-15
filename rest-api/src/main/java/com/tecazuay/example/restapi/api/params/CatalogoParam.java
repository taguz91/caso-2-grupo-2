package com.tecazuay.example.restapi.api.params;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.tecazuay.example.restapi.validations.ServicioExistConstrait;
import com.tecazuay.example.restapi.validations.TipoServicioExistConstrait;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class CatalogoParam {

	@NotBlank
	private String descripcion;

	@NotNull
	@ServicioExistConstrait
	private Long servicio_id;

	@NotNull
	@TipoServicioExistConstrait
	private Long tipo_servicio_id;

	public String getDescripcion() {
		return this.descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Long getServicio_id() {
		return this.servicio_id;
	}

	public void setServicio_id(Long servicio_id) {
		this.servicio_id = servicio_id;
	}

	public Long getTipo_servicio_id() {
		return this.tipo_servicio_id;
	}

	public void setTipo_servicio_id(Long tipo_servicio_id) {
		this.tipo_servicio_id = tipo_servicio_id;
	}

}
