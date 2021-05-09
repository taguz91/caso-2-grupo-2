package com.tecazuay.example.restapi.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity(name = "historial")
public class Historial extends Globals implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "historial_id", nullable = false)
    private Long historial_id;

    @Column(name = "accion", nullable = false, length = 100)
    private String accion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticked_id", nullable = false)
    private Ticket ticket;
    //private List<Servicio> listaServicios; 
    //relacion con tipo de servicio


    public Long getHistorial_id() {
        return this.historial_id;
    }

    public void setHistorial_id(Long historial_id) {
        this.historial_id = historial_id;
    }

    public String getAccion() {
        return this.accion;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }
  

    public Ticket getTicket() {
        return this.ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    
}
