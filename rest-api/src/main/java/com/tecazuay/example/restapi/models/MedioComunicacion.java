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
import com.fasterxml.jackson.annotation.JsonBackReference;

@Where(clause = "is_deleted = false")
@Entity(name = "medio_comunicacion")
public class MedioComunicacion extends Globals implements Serializable {

	private static final long serialVersionUID = 4356546281793282780L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "medio_comunicacion_id", nullable = false)
	private Long medio_id;

	@JsonBackReference(value = "rf_medio_comunicacion_ticket")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ticket_id", nullable = false)
	private Ticket ticket;

	@JsonManagedReference(value = "rf_medio_comunicacion_parametro")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "medio_id", nullable = false)
	private Parametros medio;

	public MedioComunicacion() {
	}

	public MedioComunicacion(Parametros mediocomunicacion2, Ticket ticket) {
		this.medio = mediocomunicacion2;
		this.ticket = ticket;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Long getMedio_id() {
		return medio_id;
	}

	public void setMedio_id(Long medio_id) {
		this.medio_id = medio_id;
	}

	public Parametros getMedio() {
		return medio;
	}

	public void setMedio(Parametros medio) {
		this.medio = medio;
	}

	public Ticket getTicket() {
		return ticket;
	}

	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}

}
