package com.tecazuay.example.restapi.models;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;

import org.hibernate.annotations.Where;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Where(clause = "is_deleted = false")
@Entity(name = "roles")
public class Rol extends Globals implements Serializable {

	private static final long serialVersionUID = 772546290575724873L;

	@Id
	@Column(name = "rol_id", nullable = false)
	private long rolId;

	@NotEmpty
	@Max(25)
	@Column(nullable = false, length = 25)
	private String nombre;

	@JsonBackReference(value = "rf_usuario_rol")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "rol")
	private List<Usuario> usuarios;

	public long getRolId() {
		return rolId;
	}

	public void setRolId(long rolId) {
		this.rolId = rolId;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<Usuario> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
