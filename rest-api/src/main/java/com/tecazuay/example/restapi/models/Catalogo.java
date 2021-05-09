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

@Entity(name = "catalogo")
public class Catalogo extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3053573538845879877L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "catalogo_id", nullable = false)
	private Long catalogo_id;

	@Column(name = "descripcion", nullable = false, length = 100)
	private String descripcion;

	@JsonBackReference(value = "rf_catalogo_servicio")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "servicio_id", nullable = false)
	private Servicio servicio;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "tipo_servicio_id", nullable = false)
	private Parametros parametro;

	public Long getCatalogo_id() {
		return catalogo_id;
	}

	public void setCatalogo_id(Long catalogo_id) {
		this.catalogo_id = catalogo_id;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Servicio getServicio() {
		return this.servicio;
	}

	public void setServicio(Servicio servicio) {
		this.servicio = servicio;
	}

	public Parametros getParametro() {
		return this.parametro;
	}

	public void setParametro(Parametros parametro) {
		this.parametro = parametro;
	}

}
