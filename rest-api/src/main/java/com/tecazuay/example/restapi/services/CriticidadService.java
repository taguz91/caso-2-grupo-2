package com.tecazuay.example.restapi.services;

import java.util.List;

import com.tecazuay.example.restapi.models.Criticidad;

public interface CriticidadService {
    List<Criticidad> findAll();
    Criticidad findById(Long id);
}
