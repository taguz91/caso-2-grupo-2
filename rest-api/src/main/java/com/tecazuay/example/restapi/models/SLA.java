package com.tecazuay.example.restapi.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Where(clause = "is_deleted = false")
@Entity(name = "sla")
public class SLA extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9029612685137758093L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sla_id", nullable = false)
	private Long sla_id;

	@Column(name = "tiempo_resolucion", nullable = false, length = 255)
	private String tiempoResolucion;

	@Column(name = "tiempo_respuesta", nullable = false, length = 255)
	private String tiempoRespuesta;

	@Column(name = "reglas_escalada", nullable = false, columnDefinition = "TEXT")
	private String reglasEscalada;

	@JsonManagedReference(value = "rf_sla_criticidad")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "criticidad_id", nullable = false)
	private Criticidad criticidad;

	@JsonManagedReference(value = "rf_sla_impacto_parametros")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "impacto_id")
	private Parametros impacto;

	@JsonManagedReference(value = "rf_sla_nivel_prioridad_parametros")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "nivel_prioridad_id")
	private Parametros nivelPrioridad;

	public Long getSla_id() {
		return sla_id;
	}

	public void setSla_id(Long sla_id) {
		this.sla_id = sla_id;
	}

	public String getTiempoResolucion() {
		return tiempoResolucion;
	}

	public void setTiempoResolucion(String tiempoResolucion) {
		this.tiempoResolucion = tiempoResolucion;
	}

	public String getTiempoRespuesta() {
		return tiempoRespuesta;
	}

	public void setTiempoRespuesta(String tiempoRespuesta) {
		this.tiempoRespuesta = tiempoRespuesta;
	}

	public String getReglasEscalada() {
		return reglasEscalada;
	}

	public void setReglasEscalada(String reglasEscalada) {
		this.reglasEscalada = reglasEscalada;
	}

	public Criticidad getCriticidad() {
		return criticidad;
	}

	public void setCriticidad(Criticidad criticidad) {
		this.criticidad = criticidad;
	}

	public Parametros getImpacto() {
		return impacto;
	}

	public void setImpacto(Parametros impacto) {
		this.impacto = impacto;
	}

	public Parametros getNivelPrioridad() {
		return nivelPrioridad;
	}

	public void setNivelPrioridad(Parametros nivelPrioridad) {
		this.nivelPrioridad = nivelPrioridad;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
