package com.tecazuay.example.restapi.services.impl;

import java.util.List;
import java.util.Optional;

import com.tecazuay.example.restapi.models.Criticidad;
import com.tecazuay.example.restapi.repositories.CriticidadRepository;
import com.tecazuay.example.restapi.services.CriticidadService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class criticidadrepoimp implements CriticidadService {


    @Autowired
    private CriticidadRepository CritiRepo;

    @Override
    public List<Criticidad> findAll() {
        return this.CritiRepo.findAll();
    }

    @Override
    public Criticidad findById(Long id) {
        Optional<Criticidad> critiservimpl = this.CritiRepo.findById(id);
        if (critiservimpl.isPresent()) {
            return critiservimpl.get();
        }else{
            return null;
        }
    }

    
}
