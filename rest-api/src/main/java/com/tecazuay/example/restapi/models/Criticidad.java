package com.tecazuay.example.restapi.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.hibernate.annotations.Where;

@Where(clause = "is_deleted = false")
@Entity(name = "criticidad")
public class Criticidad extends Globals implements Serializable{
    
    @Id
    @Column(name = "criticidad_id", nullable = false)
    private Long criticidad_id;

    @Column(name = "nombre", nullable = false, length = 25)
    private String nombre;

    @Column(name = "valor", nullable = false, length = 25)
    private String valor;

    @Column(name = "descripcion", nullable = false, length = 255)
    private String descripcion;


    public Long getCriticidad_id() {
        return this.criticidad_id;
    }

    public void setCriticidad_id(Long criticidad_id) {
        this.criticidad_id = criticidad_id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getValor() {
        return this.valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

}
