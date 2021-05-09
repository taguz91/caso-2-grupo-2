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
@Entity(name = "ticket")
public class Ticket extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4356546281793282780L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ticket_id", nullable = false)
	private Long ticket_id;

	@Column(name = "titulo", nullable = false, length = 255)
	private String titulo;

	@Column(name = "descripcion", nullable = false)
	private String descripcion;

	@Column(name = "solucion", nullable = true)
	private String solucion;

	@JsonManagedReference(value = "rf_estado_parametro")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "estado_id", nullable = false)
	private Parametros estado;

	@JsonManagedReference(value = "rf_impacto_parametro")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "impacto_id", nullable = false)
	private Parametros impacto;

	public Long getTicket_id() {
		return ticket_id;
	}

	public void setTicket_id(Long ticket_id) {
		this.ticket_id = ticket_id;
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

	public String getSolucion() {
		return solucion;
	}

	public void setSolucion(String solucion) {
		this.solucion = solucion;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Parametros getEstado() {
		return estado;
	}

	public void setEstado(Parametros estado) {
		this.estado = estado;
	}

	public Parametros getImpacto() {
		return impacto;
	}

	public void setImpacto(Parametros impacto) {
		this.impacto = impacto;
	}

}
