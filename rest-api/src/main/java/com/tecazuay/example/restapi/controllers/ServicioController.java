package com.tecazuay.example.restapi.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.ServicioParam;
import com.tecazuay.example.restapi.definitions.CategoriaResponse;
import com.tecazuay.example.restapi.definitions.ServicioResponse;
import com.tecazuay.example.restapi.models.Categoria;
import com.tecazuay.example.restapi.models.Servicio;
import com.tecazuay.example.restapi.repositories.CategoriaRepository;
import com.tecazuay.example.restapi.repositories.ServicioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/servicios")
public class ServicioController {
    
    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping("/")
    public List<ServicioResponse> getAll(){
        return servicioRepository.findAllServicios();
    }

    @GetMapping("/{id}")
    public Servicio getServicioById(@PathVariable(value = "id") Long servicio_id){
        return servicioRepository.findById(servicio_id)
            .orElseThrow(() -> new ResourceNotFoundException("No se encontro el servicio con el id: " + servicio_id));
    }

    @GetMapping("/categoria/{id}")
    public List <ServicioResponse> getAllByCategoriaId(@PathVariable("id") Long categoria_id){
        return servicioRepository.findAllByCategoriaId(categoria_id);
    }

    @PostMapping("/")
    public Servicio saveServicio(@RequestBody @Valid ServicioParam servicioParam){
        CategoriaResponse categoria = categoriaRepository.findByCategoriaId(servicioParam.getCategoria().getCategoria_id())
                        .orElseThrow(() -> new ResourceNotFoundException("No se encontro la categoria"));
        Servicio servicio = new Servicio();
        servicio.setNombre_servicio(servicioParam.getNombre_servicio());
        servicio.setCategoria(servicioParam.getCategoria());
        return servicioRepository.save(servicio);   
    }

    @PutMapping("/{id}")
    public Servicio updateServicio(@PathVariable(value = "id") Long servicio_id, @Valid @RequestBody ServicioParam newServicio){
        Servicio servicio = servicioRepository.findById(servicio_id)
            .orElseThrow(() -> new ResourceNotFoundException("No se encontro el servicio con id: " + servicio_id));
        servicio.setNombre_servicio(newServicio.getNombre_servicio());
        return servicioRepository.save(servicio);
    }

    @DeleteMapping("/{id}")
    public boolean deleteServicio(@PathVariable(value = "id") Long servicio_id){
        Servicio servicio = servicioRepository.findById(servicio_id)
            .orElseThrow(() -> new ResourceNotFoundException("No se encontro el servicio con Id: " + servicio_id));
        servicioRepository.deleteById(servicio_id);
        return true;
    }

}
