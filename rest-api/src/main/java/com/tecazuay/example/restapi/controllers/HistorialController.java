package com.tecazuay.example.restapi.controllers;

import com.tecazuay.example.restapi.api.params.HistorialParam;
import com.tecazuay.example.restapi.models.Historial;
import com.tecazuay.example.restapi.repositories.HistorialRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1/historial")
public class HistorialController {

    @Autowired
    HistorialRepository historialRepository;

    @GetMapping("/")
    public List<Historial> getAll() {
        return historialRepository.findAll();
    }

    @GetMapping("/historial/{id}")
    public Optional<Historial> getCategoria(@PathVariable("id") Long historial_id) {
        return historialRepository.findById(historial_id);
    }

    @PostMapping("/historial")
    public Historial saveHistorial(@RequestBody @Valid HistorialParam historialParam) {
        Historial historial = new Historial();
        historial.setAccion(historialParam.getAccion());
        // historial.setServicio(historialParam.getServicio_id());
        // historial.setParametro(historialParam.setTipo_servicio_id(historialParam.getTipo_servicio_id()));
        return historialRepository.save(historial);
    }

    @PutMapping("/historial/{id}")
    public Historial updateHistorial(@PathVariable("id") Long historial_id, @RequestBody Historial newHistorial) {
        return historialRepository.findById(historial_id).map(historial -> {
            historial.setAccion(newHistorial.getAccion());
            return historialRepository.save(newHistorial);
        }).orElseGet(() -> {
            newHistorial.setHistorial_id(historial_id);
            return historialRepository.save(newHistorial);
        });
    }

    @DeleteMapping("/historial/{id}")
    public void deleteHistorial(@PathVariable("id") Long historial_id) {
        historialRepository.deleteById(historial_id);
    }
}
