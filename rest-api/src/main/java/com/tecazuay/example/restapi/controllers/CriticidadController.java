package com.tecazuay.example.restapi.controllers;

import java.util.List;

import com.tecazuay.example.restapi.models.Criticidad;
import com.tecazuay.example.restapi.services.CriticidadService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/criticidad")
public class CriticidadController {
    
    @Autowired
    private CriticidadService critiserv;

    @GetMapping(value="/")
    public ResponseEntity<List<Criticidad>> ReadAllEncuestas() {
        return ResponseEntity.status(HttpStatus.OK).body(this.critiserv.findAll());
    }

    @GetMapping(value="/id")
    public ResponseEntity<Criticidad> ReadEncuestaById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.critiserv.findById(id));
    }
}
