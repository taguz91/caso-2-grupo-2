package com.tecazuay.example.restapi.controllers;

import com.tecazuay.example.restapi.services.AuthorizationService;
import com.tecazuay.example.restapi.services.encuestasatisfaccionservice;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.EncuestaParams;
import com.tecazuay.example.restapi.definitions.EncuestaUsuarioResponse;
import com.tecazuay.example.restapi.definitions.PageResponse;
import com.tecazuay.example.restapi.models.EncuestaSatisfacion;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.EncuestaRepository;
import com.tecazuay.example.restapi.repositories.TicketRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<PageResponse> ReadAllEncuestas(@AuthenticationPrincipal Usuario user,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "20") int size) {

        AuthorizationService.onlyAdminOrDev(user);
        Pageable pageable = PageRequest.of(page, size);
        Page<EncuestaSatisfacion> encuesta = encuesta_repo.findAll(pageable);
        List<EncuestaSatisfacion> encuestaSatisfacion = encuesta.getContent();
        List<EncuestaUsuarioResponse> pageresponselist = new ArrayList<EncuestaUsuarioResponse>();
        for (EncuestaSatisfacion es : encuestaSatisfacion) {
            pageresponselist.add(new EncuestaUsuarioResponse(es));
        }
        Page<EncuestaUsuarioResponse> pageresponse = new PageImpl<EncuestaUsuarioResponse>(pageresponselist, pageable,
                encuesta.getTotalElements());
        return ResponseEntity.status(HttpStatus.OK).body(new PageResponse(pageresponse));
    }

    @GetMapping(value = "/id")
    public ResponseEntity<EncuestaSatisfacion> ReadEncuestaById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.encuService.findById(id));
    }

    @PostMapping(value = "/")
    public ResponseEntity<EncuestaSatisfacion> PostEncuesta(@Valid @RequestBody EncuestaParams encu) {
        Ticket ticket = ticketRepository.findById(encu.getTicketid()).orElseThrow(ResourceNotFoundException::new);
        EncuestaSatisfacion encuesta = encuesta_repo.existsByTicket(encu.getTicketid());
        if (encuesta == null) {
            encuesta = new EncuestaSatisfacion();
        }
        encuesta.setTicket(ticket);
        encuesta.setCalificacion(encu.getCalificacion());
        encuesta.setComentario(encu.getComentarios());
        return ResponseEntity.status(HttpStatus.CREATED).body(encuesta_repo.save(encuesta));
    }
}
