package com.tecazuay.example.restapi.models;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import org.hibernate.annotations.Where;

@Where(clause = "is_deleted = false")
@Entity(name = "encuesta_satisfaccion")
public class EncuestaSatisfacion extends Globals implements Serializable {

	private static final long serialVersionUID = 1825526025210400550L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "encuesta_id", nullable = false)
	private Long encuesta_id;

	@Column(name = "calificacion", nullable = false)
	private int calificacion;

	@Column(name = "comentario", nullable = false, length = 255)
	private String comentario;
	
	@JsonBackReference(value = "rf_ticket_encuesta_satisfaccion")
	@JoinColumn(name = "ticket_id", nullable = false)
	@OneToOne(cascade = CascadeType.ALL)
	private Ticket ticket;

	public Long getEncuesta_id() {
		return this.encuesta_id;
	}

	public void setEncuesta_id(Long encuesta_id) {
		this.encuesta_id = encuesta_id;
	}

	public String getComentario() {
		return this.comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public int getCalificacion() {
		return calificacion;
	}

	public void setCalificacion(int calificacion) {
		this.calificacion = calificacion;
	}

	public Ticket getTicket() {
		return ticket;
	}

	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
