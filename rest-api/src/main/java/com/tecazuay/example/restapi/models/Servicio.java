package com.tecazuay.example.restapi.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity(name = "servicio")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Servicio extends Globals implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3052880119732342924L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "servicio_id", nullable = false)
	private Long servicio_id;

	@Column(name = "nombre_servicio", nullable = false, length = 100)
	private String nombre_servicio;

	@JsonManagedReference(value = "rf_categoria_servicio")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "categoria_id", nullable = false)
	private Categoria categoria;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "servicio")
	private List<Catalogo> listaCatalogos;

	public Long getServicio_id() {
		return servicio_id;
	}

	public void setServicio_id(Long servicio_id) {
		this.servicio_id = servicio_id;
	}

	public String getNombre_servicio() {
		return nombre_servicio;
	}

	public void setNombre_servicio(String nombre_servicio) {
		this.nombre_servicio = nombre_servicio;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public List<Catalogo> getListaCatalogos() {
		return this.listaCatalogos;
	}

	public void setListaCatalogos(List<Catalogo> listaCatalogos) {
		this.listaCatalogos = listaCatalogos;
	}

}
