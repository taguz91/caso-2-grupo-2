package com.tecazuay.example.restapi.controllers;

import com.tecazuay.example.restapi.api.params.MedioComunicacionParam;
import com.tecazuay.example.restapi.models.MedioComunicacion;
import com.tecazuay.example.restapi.repositories.MedioComunicacionRepository;
import com.tecazuay.example.restapi.services.MedioService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping("/medioComunicacion")
public class MedioComunicacionController {

	@Autowired
	private MedioService medioService;

	@Autowired
	MedioComunicacionRepository medioComunicacionRepository;

	@RequestMapping(value = "", method = RequestMethod.GET)
	@ResponseBody
	@CrossOrigin
	public List<MedioComunicacion> listar() {
		return medioComunicacionRepository.findAll();
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseBody
	@CrossOrigin
	public ResponseEntity<MedioComunicacion> guardar(@Valid @RequestBody MedioComunicacionParam p) {
		return ResponseEntity.status(HttpStatus.CREATED).body(medioService.save(p));
	}

	@RequestMapping(value = "/{medio_id}", method = RequestMethod.GET)
	@ResponseBody
	public MedioComunicacion leer(@PathVariable Long medio_id) {
		return medioComunicacionRepository.getOne(medio_id);
	}

	@RequestMapping(value = "/{medio_id}", method = RequestMethod.DELETE)
	@ResponseBody
	@CrossOrigin
	public void borrar(@PathVariable Long medio_id) {
		medioComunicacionRepository.deleteById(medio_id);
	}

	
}
