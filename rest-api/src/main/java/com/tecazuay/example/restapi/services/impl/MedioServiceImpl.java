package com.tecazuay.example.restapi.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.MedioComunicacionParam;
import com.tecazuay.example.restapi.models.MedioComunicacion;
import com.tecazuay.example.restapi.models.Parametros;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.repositories.MedioComunicacionRepository;
import com.tecazuay.example.restapi.repositories.ParametrosRepository;
import com.tecazuay.example.restapi.repositories.TicketRepository;
import com.tecazuay.example.restapi.services.MedioService;

import org.springframework.stereotype.Service;

@Service
public class MedioServiceImpl implements MedioService {
    
    @Autowired
     private MedioComunicacionRepository medioComunicacionRepository;

    @Autowired
    private ParametrosRepository parametrosRepository;
     
    @Override
    public List<MedioComunicacion> findAll() {
        return this.medioComunicacionRepository.findAll();
    }

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public MedioComunicacion findById(Long id) {
        Optional<MedioComunicacion> medio = this.medioComunicacionRepository.findById(id); 
        if (medio.isPresent()) {
            return medio.get();
        }else {
            return null;
        }
    }

    @Override
    public MedioComunicacion save(MedioComunicacionParam medioComunicacion) {
        Parametros medio = parametrosRepository.findById(medioComunicacion.getMedio_id()).orElseThrow(()->new ResourceNotFoundException("No existe el tipo de medio de comunicacion"));
        Ticket ticket = ticketRepository.findById(medioComunicacion.getTicket_id()).orElseThrow(()->new ResourceNotFoundException("No existe el ticket"));
        MedioComunicacion medioComunicacion2 = new MedioComunicacion(medio,ticket);
        return medioComunicacionRepository.save(medioComunicacion2);
    }


    
}
