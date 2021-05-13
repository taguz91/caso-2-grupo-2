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
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity(name = "usuarios")
@Where(clause = "is_deleted = false")
public class Usuario extends Globals implements Serializable {

	private static final long serialVersionUID = -4115808525376597079L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "usuario_id")
	private Long personaId;

	@NotEmpty
	@Max(50)
	@Pattern(regexp = "[a-zA-Z]")
	@Column(nullable = false, length = 50)
	private String nombres;

	@Max(50)
	@Pattern(regexp = "[0-9]")
	@Column(nullable = false, length = 50)
	private String apellidos;

	@NotEmpty
	@Email
	@Max(100)
	@Column(nullable = false, length = 100)
	private String correo;

	@NotEmpty
	@Min(8)
	@Max(30)
	@Column(nullable = false, length = 30)
	private String password;

	@Column(nullable = true, length = 100)
	private String token;

	@NotEmpty
	@Max(15)
	@Min(10)
	@Pattern(regexp = "[0-9]")
	@Column(nullable = true, length = 15)
	private String telefono;

	@JsonManagedReference(value = "rf_usuario_rol")
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "rol_id", nullable = false)
	private Rol rol;

	@JsonBackReference(value = "rf_ticket_usuario")
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "usuario")
	private List<Ticket> tickets;

	public Usuario() {
	}

	public Usuario(String nombres, String apellidos, String correo, String password) {
		this.nombres = nombres;
		this.apellidos = apellidos;
		this.correo = correo;
		this.password = password;
	}

	public Usuario(Long personaId, String nombres, String apellidos, String correo, String password, String token,
			String telefono) {
		this.personaId = personaId;
		this.nombres = nombres;
		this.apellidos = apellidos;
		this.correo = correo;
		this.password = password;
		this.token = token;
		this.telefono = telefono;
	}

	public Long getPersonaId() {
		return personaId;
	}

	public void setPersonaId(Long personaId) {
		this.personaId = personaId;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
