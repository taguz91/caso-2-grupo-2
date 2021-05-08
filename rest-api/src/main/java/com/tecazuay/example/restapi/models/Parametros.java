package com.tecazuay.example.restapi.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Where(clause = "is_deleted = false")
@Entity(name = "parametros")
public class Parametros extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1825526025210400550L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "parametros_id", nullable = false)
	private Long parametros_id;

	@Column(name = "type", nullable = false)
	private int type;

	@Column(name = "nombre", nullable = false, length = 255)
	private String nombre;

	@JsonManagedReference(value = "rf_estado_parametro")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "estado")
	private List<Ticket> ticketsEstado;

	@JsonManagedReference(value = "rf_impacto_parametro")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "impacto")
	private List<Ticket> ticketsImpacto;

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

}
