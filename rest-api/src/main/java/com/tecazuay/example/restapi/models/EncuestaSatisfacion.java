package com.tecazuay.example.restapi.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import org.hibernate.annotations.Where;

@Where(clause="is_deleted = false")
@Entity(name = "encuestasatisfaccion")
public class EncuestaSatisfacion extends Globals implements Serializable{
    
    private static final long serialVersionUID = 1825526025210400550L;


    @Id
    @Column(name = "encuesta_id",nullable = false)
    private Long encuesta_id;
    
    @Column(name = "calificacion", nullable = false, length = 10)
    private String calificacion;

    @Column(name = "comentario", nullable = false, length = 255)
    private String comentario;

    @JsonManagedReference(value = "rf_ticket_id")
    @OneToMany(cascade = CascadeType.ALL, mappedBy ="ticket")
    private List<Ticket> ticketencuesta;


    public Long getEncuesta_id() {
        return this.encuesta_id;
    }

    public void setEncuesta_id(Long encuesta_id) {
        this.encuesta_id = encuesta_id;
    }

    public String getCalificacion() {
        return this.calificacion;
    }

    public void setCalificacion(String calificacion) {
        this.calificacion = calificacion;
    }

    public String getComentario() {
        return this.comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public List<Ticket> getTicketencuesta() {
        return this.ticketencuesta;
    }

    public void setTicketencuesta(List<Ticket> ticketencuesta) {
        this.ticketencuesta = ticketencuesta;
    }

}
