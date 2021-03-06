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

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity(name = "historial")
public class Historial extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1878151424260956296L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "historial_id", nullable = false)
	private Long historial_id;

	@Column(name = "accion", nullable = false, length = 3550)
	private String accion;

	@JsonBackReference(value = "rf_historial_ticket")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ticked_id", nullable = false)
	private Ticket ticket;

	public Historial() {
	}

	public Historial(String accion, Ticket ticket) {
		this.accion = accion;
		this.ticket = ticket;
	}

	public Long getHistorial_id() {
		return this.historial_id;
	}

	public void setHistorial_id(Long historial_id) {
		this.historial_id = historial_id;
	}

	public String getAccion() {
		return this.accion;
	}

	public void setAccion(String accion) {
		this.accion = accion;
	}

	public Ticket getTicket() {
		return this.ticket;
	}

	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}

}
