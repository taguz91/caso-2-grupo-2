package com.tecazuay.example.restapi.models;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import org.hibernate.annotations.Where;

@Where(clause = "is_deleted = false")
@Entity(name = "roles")
public class Rol extends Globals implements Serializable {

	private static final long serialVersionUID = 772546290575724873L;

	@Id
	@Column(name = "rol_id", nullable = false)
	private long rolId;

	@NotEmpty
	@Column(nullable = false, length = 25)
	private String nombre;

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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
