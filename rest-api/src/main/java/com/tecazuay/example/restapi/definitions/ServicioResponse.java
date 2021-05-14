package com.tecazuay.example.restapi.definitions;

import com.tecazuay.example.restapi.models.Categoria;

public interface ServicioResponse {
    
    Long getServicio_id();

    String getNombre_servicio();

    Categoria getCategoria();


}
