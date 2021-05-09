package com.tecazuay.example.restapi.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Where(clause = "is_deleted = false")
@Entity(name = "parametros")
public class Parametros extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1825526025210400550L;

	@Id
	@Column(name = "parametros_id", nullable = false)
	private Long parametros_id;

	@Column(name = "type", nullable = false)
	private int type;

	@Column(name = "nombre", nullable = false, length = 255)
	private String nombre;

	@Column(name = "descripcion", nullable = false, columnDefinition = "TEXT", length = 1024)
	private String descripcion;

	@JsonBackReference(value = "rf_estado_parametro")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "estado")
	private List<Ticket> ticketsEstado;

	@JsonBackReference(value = "rf_impacto_parametro")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "impacto")
	private List<Ticket> ticketsImpacto;

	
	@JsonBackReference(value = "rf_medio_comunicacion_parametro")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "medio")
	private List<MedioComunicacion> mediosComunicacion;

	@JsonBackReference(value = "rf_sla_impacto_parametros")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "impacto")
	private List<SLA> slaImpactos;

	@JsonBackReference(value = "rf_sla_nivel_prioridad_parametros")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "nivelPrioridad")
	private List<SLA> slaNivelPrioridad;

	public Long getParametros_id() {
		return parametros_id;
	}

	public void setParametros_id(Long parametros_id) {
		this.parametros_id = parametros_id;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public List<Ticket> getTicketsEstado() {
		return ticketsEstado;
	}

	public void setTicketsEstado(List<Ticket> ticketsEstado) {
		this.ticketsEstado = ticketsEstado;
	}

	public List<Ticket> getTicketsImpacto() {
		return ticketsImpacto;
	}

	public void setTicketsImpacto(List<Ticket> ticketsImpacto) {
		this.ticketsImpacto = ticketsImpacto;
	}

	public List<MedioComunicacion> getMediosComunicacion() {
		return mediosComunicacion;
	}

	public List<SLA> getSlaImpactos() {
		return slaImpactos;
	}

	public void setSlaImpactos(List<SLA> slaImpactos) {
		this.slaImpactos = slaImpactos;
	}

	public List<SLA> getSlaNivelPrioridad() {
		return slaNivelPrioridad;
	}

	public void setSlaNivelPrioridad(List<SLA> slaNivelPrioridad) {
		this.slaNivelPrioridad = slaNivelPrioridad;
	}

	public void setMediosComunicacion(List<MedioComunicacion> mediosComunicacion) {
		this.mediosComunicacion = mediosComunicacion;
	}

}
