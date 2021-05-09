package com.tecazuay.example.restapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.definitions.ParametrosResponse;
import com.tecazuay.example.restapi.models.Parametros;
import com.tecazuay.example.restapi.repositories.ParametrosRepository;

@RestController
@RequestMapping("/api/v1/parametros")
public class ParametrosController {

	@Autowired
	private ParametrosRepository parametrosRepository;

	@GetMapping({ "/", "", "/all" })
	public List<Parametros> getAll() {
		return parametrosRepository.findAll();
	}

	@GetMapping("/type/{type}")
	public List<Parametros> getByType(@PathVariable int type) {
		return parametrosRepository.findAllByType(type);
	}

	@GetMapping("/impacto")
	public List<ParametrosResponse> getImpactos() {
		return parametrosRepository.findParametrosByType(Types.PARAMETROS_IMPACTO);
	}

	@GetMapping("/nivel-prioridad")
	public List<ParametrosResponse> getNivelPrioridad() {
		return parametrosRepository.findParametrosByType(Types.PARAMETROS_NIVEL_PRIORIDAD);
	}

	@GetMapping("/estados")
	public List<ParametrosResponse> getEstados() {
		return parametrosRepository.findParametrosByType(Types.PARAMETROS_ESTADOS);
	}

	@GetMapping("/tipo-servicios")
	public List<ParametrosResponse> getTiposServicios() {
		return parametrosRepository.findParametrosByType(Types.PARAMETROS_TIPO_SERVICIOS);
	}
}
