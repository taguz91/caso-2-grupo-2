package com.tecazuay.example.restapi.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "roles")
public class Rol extends Globals {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "rol_id")
	private int rolId;

	@Column(nullable = false, length = 25)
	private String nombre;

	@JsonBackReference(value = "rf_usuario_rol")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "rol")
	private List<Usuario> usuarios;

	public Rol() {
	}

	public Rol(int rolId, String nombre) {
		this.rolId = rolId;
		this.nombre = nombre;
	}

	public int getRolId() {
		return rolId;
	}

	public void setRolId(int rolId) {
		this.rolId = rolId;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

}
