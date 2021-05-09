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

import com.fasterxml.jackson.annotation.JsonBackReference;

@Where(clause = "is_deleted = false")
@Entity(name = "adjuntos")
public class Adjunto extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5734612529335258261L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "adjunto_id", nullable = false)
	private Long adjunto_id;

	@Column(name = "url", nullable = false, length = 255)
	private String url;

	@JsonBackReference(value = "rf_adjunto_ticket")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ticket_id")
	private Ticket ticket;

	public Long getAdjunto_id() {
		return adjunto_id;
	}

	public void setAdjunto_id(Long adjunto_id) {
		this.adjunto_id = adjunto_id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
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
