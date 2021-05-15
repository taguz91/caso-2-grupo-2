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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "categoria")
public class Categoria extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1457365226476276547L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "categoria_id", nullable = false)
	private Long categoria_id;

	@Column(name = "nombre_categoria", nullable = false, length = 100)
	private String nombre_categoria;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "categoria")
	private List<Servicio> listaServicios;

	public Long getCategoria_id() {
		return categoria_id;
	}

	public void setCategoria_id(Long categoria_id) {
		this.categoria_id = categoria_id;
	}

	public String getNombre_categoria() {
		return nombre_categoria;
	}

	public void setNombre_categoria(String nombre_categoria) {
		this.nombre_categoria = nombre_categoria;
	}

	public List<Servicio> getListaServicios() {
		return listaServicios;
	}

	public void setListaServicios(List<Servicio> listaServicios) {
		this.listaServicios = listaServicios;
	}

}
