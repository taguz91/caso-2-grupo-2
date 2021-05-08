package com.tecazuay.example.restapi.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Where;

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

	@Column(name = "solucion", nullable = false)
	private String solucion;

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

}
