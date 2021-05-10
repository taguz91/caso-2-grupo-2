package com.tecazuay.example.restapi.definitions;

import com.tecazuay.example.restapi.models.Usuario;

public class UsuarioToken {

	private String correo;
	private String nombres;
	private String apellidos;
	private String token;

	public UsuarioToken(Usuario user, String token) {
		this.correo = user.getCorreo();
		this.nombres = user.getNombres();
		this.apellidos = user.getApellidos();
		this.token = token;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
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

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
