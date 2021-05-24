package com.tecazuay.example.restapi.controllers;
import com.tecazuay.example.restapi.services.encuestasatisfaccionservice;
import java.util.List;
import javax.validation.Valid;

import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.EncuestaParams;
import com.tecazuay.example.restapi.models.EncuestaSatisfacion;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.repositories.EncuestaRepository;
import com.tecazuay.example.restapi.repositories.TicketRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/encuesta")
public class EncuestaController {
    
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private encuestasatisfaccionservice encuService;

    @Autowired
    private EncuestaRepository encuesta_repo;

    @GetMapping(value = "/")
    public ResponseEntity<List<EncuestaSatisfacion>> ReadAllEncuestas() {
        return ResponseEntity.status(HttpStatus.OK).body(this.encuService.findAll());
    }

    @GetMapping(value = "/id")
    public ResponseEntity<EncuestaSatisfacion> ReadEncuestaById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.encuService.findById(id));
    }

    @PostMapping(value = "/")
    public ResponseEntity<EncuestaSatisfacion> PostEncuesta(@Valid @RequestBody EncuestaParams encu){
        Ticket ticket = ticketRepository.findById(encu.getTicketid()).orElseThrow(ResourceNotFoundException::new);
        EncuestaSatisfacion encuesta =new EncuestaSatisfacion();
        encuesta.setTicket(ticket);
        encuesta.setCalificacion(encu.getCalificacion());
        encuesta.setComentario(encu.getComentarios()); 
        return ResponseEntity.status(HttpStatus.CREATED).body(encuesta_repo.save(encuesta));
    }
}
