package com.tecazuay.example.restapi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.tecazuay.example.restapi.models.Catalogo;
import com.tecazuay.example.restapi.repositories.CatalogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@RestController
@RequestMapping("/catalogo")
public class CatalogoController {

	@Autowired
	CatalogoRepository catalogoRepository;

	@RequestMapping(value = "", method = RequestMethod.GET)
	@ResponseBody
	@CrossOrigin
	public List<Catalogo> listar() {
		return catalogoRepository.findAll();
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	@ResponseBody
	@CrossOrigin
	public Catalogo guardar(@RequestBody Catalogo p) {
		return catalogoRepository.save(p);
	}

	@RequestMapping(value = "/{catalogo_id}", method = RequestMethod.GET)
	@ResponseBody
	public Catalogo leer(@PathVariable Long catalogo_id) {
		return catalogoRepository.getOne(catalogo_id);
	}

	@RequestMapping(value = "/{catalogo_id}", method = RequestMethod.DELETE)
	@ResponseBody
	@CrossOrigin
	public void borrar(@PathVariable Long catalogo_id) {
		catalogoRepository.deleteById(catalogo_id);
	}
}
