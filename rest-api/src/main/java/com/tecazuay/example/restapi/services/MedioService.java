package com.tecazuay.example.restapi.services;

import java.util.List;

import com.tecazuay.example.restapi.api.params.MedioComunicacionParam;
import com.tecazuay.example.restapi.models.MedioComunicacion;

public interface MedioService {
    
    List<MedioComunicacion> findAll();

    MedioComunicacion findById(Long id);

    MedioComunicacion save(MedioComunicacionParam medioComunicacion);
}
