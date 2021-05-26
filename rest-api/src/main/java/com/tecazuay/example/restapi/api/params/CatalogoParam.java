package com.tecazuay.example.restapi.api.params;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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

	@NotNull
	private Long impacto;

	@NotNull
	private Long criticidad;

	@NotNull
	private Long nivelPrioridad;

	@NotNull
	@Size(max = 255)
	private String reglasEscalada;

	@NotNull
	@Size(max = 255)
	private String tiempoRespuesta;

	@NotNull
	@Size(max = 255)
	private String timpoSolucion;

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

	public Long getImpacto() {
		return impacto;
	}

	public void setImpacto(Long impacto) {
		this.impacto = impacto;
	}

	public Long getCriticidad() {
		return criticidad;
	}

	public void setCriticidad(Long criticidad) {
		this.criticidad = criticidad;
	}

	public Long getNivelPrioridad() {
		return nivelPrioridad;
	}

	public void setNivelPrioridad(Long nivelPrioridad) {
		this.nivelPrioridad = nivelPrioridad;
	}

	public String getReglasEscalada() {
		return reglasEscalada;
	}

	public void setReglasEscalada(String reglasEscalada) {
		this.reglasEscalada = reglasEscalada;
	}

	public String getTiempoRespuesta() {
		return tiempoRespuesta;
	}

	public void setTiempoRespuesta(String tiempoRespuesta) {
		this.tiempoRespuesta = tiempoRespuesta;
	}

	public String getTimpoSolucion() {
		return timpoSolucion;
	}

	public void setTimpoSolucion(String timpoSolucion) {
		this.timpoSolucion = timpoSolucion;
	}

}
