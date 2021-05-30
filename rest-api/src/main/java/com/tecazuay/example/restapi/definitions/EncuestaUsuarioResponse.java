package com.tecazuay.example.restapi.definitions;

import com.tecazuay.example.restapi.models.EncuestaSatisfacion;
import com.tecazuay.example.restapi.models.Usuario;

public class EncuestaUsuarioResponse {
    

	private Long encuesta_id;

	private int calificacion;
	
	private String comentario;

    private Usuario usuario;
    

    public EncuestaUsuarioResponse(EncuestaSatisfacion encuesta) {
        this.encuesta_id = encuesta.getEncuesta_id();
        this.calificacion=encuesta.getCalificacion();
        this.comentario=encuesta.getComentario();
        this.usuario=encuesta.getTicket().getUsuario();
    }

    public Long getEncuesta_id() {
        return this.encuesta_id;
    }

    public void setEncuesta_id(Long encuesta_id) {
        this.encuesta_id = encuesta_id;
    }

    public int getCalificacion() {
        return this.calificacion;
    }

    public void setCalificacion(int calificacion) {
        this.calificacion = calificacion;
    }

    public String getComentario() {
        return this.comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
}
