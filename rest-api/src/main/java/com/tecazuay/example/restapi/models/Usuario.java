package com.tecazuay.example.restapi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuario extends Globals {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "usuario_id")
    private int personaId;

    @Column(nullable = false, length = 50)
    private String nombres;

    @Column(nullable = false, length = 100)
    private String correo;

    @Column(nullable = false, length = 30)
    private String password;

    @Column(nullable = true, length = 30)
    private String token;

    @Column(nullable = true, length = 15)
    private String telefono;

    @ManyToOne
    private Rol rol;

    public Usuario() {
    }

    public Usuario(int personaId, String nombres, String correo, String password, String telefono) {
        this.personaId = personaId;
        this.nombres = nombres;
        this.correo = correo;
        this.password = password;
        this.telefono = telefono;
    }

    public int getPersonaId() {
        return personaId;
    }

    public void setPersonaId(int personaId) {
        this.personaId = personaId;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
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
}
