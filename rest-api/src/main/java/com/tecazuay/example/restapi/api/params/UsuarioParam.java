package com.tecazuay.example.restapi.api.params;

import java.io.Serializable;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

public class UsuarioParam implements Serializable{
    
	private Long personaId;

	@NotEmpty
    @Pattern(regexp = "[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{2,100}")
	private String nombres;

	@NotEmpty
    @Pattern(regexp = "[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{2,100}")
	private String apellidos;

    @NotEmpty
    @Email
	private String correo;

    @NotEmpty
	@Pattern(regexp = "[^.]{8,30}")
	private String password;

	private String token;
    
    @Pattern(regexp = "[0-9]{10,15}")
	private String telefono;

	public UsuarioParam() {
	}

	public UsuarioParam(String nombres, String apellidos, String correo, String password) {
		this.nombres = nombres;
		this.apellidos = apellidos;
		this.correo = correo;
		this.password = password;
	}

	public UsuarioParam(Long personaId, String nombres, String apellidos, String correo, String password, String telefono) {
		this.personaId = personaId;
		this.nombres = nombres;
		this.apellidos = apellidos;
		this.correo = correo;
		this.password = password;
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
}
