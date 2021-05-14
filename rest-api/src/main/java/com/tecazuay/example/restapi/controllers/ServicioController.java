package com.tecazuay.example.restapi.controllers;

import java.util.List;

import javax.validation.Valid;

import com.tecazuay.example.restapi.api.params.ServicioParam;
import com.tecazuay.example.restapi.models.Servicio;
import com.tecazuay.example.restapi.repositories.ServicioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/servicios", consumes = MediaType.APPLICATION_JSON_VALUE)
public class ServicioController {

	@Autowired
	private ServicioRepository servicioRepository;

	@GetMapping(value = "/")
	public List<Servicio> getAll() {
		return servicioRepository.findAll();
	}

	@GetMapping("/{id}")
	public List<Servicio> getAllByCategoriaId(@PathVariable("id") Long categoria_id) {
		return servicioRepository.findByCategoriaId(categoria_id);
	}

	@PostMapping(value = "/")
	@ResponseBody
	public Servicio saveServicio(@RequestBody @Valid ServicioParam servicioParam) {
		Servicio servicio = new Servicio();
		servicio.setNombre_servicio(servicioParam.getNombre_servicio());
		servicio.setCategoria(servicioParam.getCategoria());
		return servicioRepository.save(servicio);
	}

}
