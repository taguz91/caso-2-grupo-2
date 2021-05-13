package com.tecazuay.example.restapi.services.impl;

import java.util.List;
import java.util.Optional;

import com.tecazuay.example.restapi.models.EncuestaSatisfacion;
import com.tecazuay.example.restapi.repositories.EncuestaRepository;
import com.tecazuay.example.restapi.services.encuestasatisfaccionservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class encsatiservimpl implements encuestasatisfaccionservice {

    @Autowired
     private EncuestaRepository encuesta_repository;

    @Override
    public List<EncuestaSatisfacion> findAll() {
        return this.encuesta_repository.findAll();
    }

    @Override
    public EncuestaSatisfacion findById(Long id) {
        Optional<EncuestaSatisfacion> encsat = this.encuesta_repository.findById(id); 
        if (encsat.isPresent()) {
            return encsat.get();
        }else {
            return null;
        }
        
    }


    
}