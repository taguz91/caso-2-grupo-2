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
@Entity(name = "medio_comunicacion")
public class MedioComunicacion extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4356546281793282780L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "medio_comunicacion_id", nullable = false)
	private Long medio_id;

	@JsonManagedReference(value = "rf_medio_comunicacion_parametro")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "medio_id", nullable = false)
	private Parametros medio;

	public Long getMedio_id() {
		return this.medio_id;
	}

	public void setMedio_id(Long medio_id) {
		this.medio_id = medio_id;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Parametros getMedio() {
		return medio;
	}

	public void setMedio(Parametros medio) {
		this.medio = medio;
	}
}
