package com.tecazuay.example.restapi.controllers;

import java.util.List;

import com.tecazuay.example.restapi.models.Servicio;
import com.tecazuay.example.restapi.repositories.ServicioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/servicios")
public class ServicioController {
    
    @Autowired
    private ServicioRepository servicioRepository;

    @GetMapping("/{id}")
    public List<Servicio> getAll(@PathVariable("id") Long categoria_id){
        return servicioRepository.findByCategoriaId(categoria_id);
    }

}
