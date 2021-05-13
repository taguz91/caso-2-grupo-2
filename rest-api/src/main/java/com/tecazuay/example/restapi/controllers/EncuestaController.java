package com.tecazuay.example.restapi.controllers;

import com.tecazuay.example.restapi.services.encuestasatisfaccionservice;

import java.util.List;

import com.tecazuay.example.restapi.models.EncuestaSatisfacion;


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
@RequestMapping("/api/v1/encuesta")
public class EncuestaController {
    

    @Autowired
    private encuestasatisfaccionservice encuService;

    @GetMapping(value = "/")
    public ResponseEntity<List<EncuestaSatisfacion>> ReadAllEncuestas() {
        return ResponseEntity.status(HttpStatus.OK).body(this.encuService.findAll());
    }

    @GetMapping(value = "/id")
    public ResponseEntity<EncuestaSatisfacion> ReadEncuestaById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.encuService.findById(id));
    }

}
