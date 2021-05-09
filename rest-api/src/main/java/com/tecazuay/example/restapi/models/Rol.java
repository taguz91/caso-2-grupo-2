package com.tecazuay.example.restapi.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "roles")
public class Rol extends Globals {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "rol_id")
    private int rolId;    
    private String nombre;

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
