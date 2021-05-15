package com.tecazuay.example.restapi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import com.tecazuay.example.restapi.api.params.CatalogoParam;
import com.tecazuay.example.restapi.models.Catalogo;
import com.tecazuay.example.restapi.repositories.CatalogoRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/v1/catalogo")
public class CatalogoController {

		@Autowired
		CatalogoRepository catalogoRepository;
	
		@GetMapping("/")
		public List<Catalogo> getAll(){
			return catalogoRepository.findAll();
		}
	
		@GetMapping("/catalogo/{id}")
		public Optional<Catalogo> getCategoria(@PathVariable("id") Long catalogo_id){
			return catalogoRepository.findById(catalogo_id);
		}
	
		@PostMapping("/catalogo")
		public Catalogo saveCatalago(@RequestBody @Valid CatalogoParam catalogoParam ){
			Catalogo catalogo= new Catalogo();
			catalogo.setDescripcion(catalogoParam.getDescripcion());
			//catalogo.setServicio(catalogoParam.getServicio_id());
			//catalogo.setParametro(catalogoParam.setTipo_servicio_id(catalogoParam.getTipo_servicio_id()));
			return catalogoRepository.save(catalogo);
		}
		
		@PutMapping("/catalogo/{id}")
		public Catalogo updateCatalago(@PathVariable("id") Long catalogo_id, @RequestBody Catalogo newCatalogo){
			return catalogoRepository.findById(catalogo_id)
			.map(catalogo -> {
				catalogo.setDescripcion(newCatalogo.getDescripcion());
				return catalogoRepository.save(newCatalogo);
			})
			.orElseGet(() -> {
				newCatalogo.setCatalogo_id(catalogo_id);
				return catalogoRepository.save(newCatalogo);
			});
		}
	
		@DeleteMapping("/catalogo/{id}")
		public void deleteCatalago(@PathVariable("id") Long catalogo_id){
			catalogoRepository.deleteById(catalogo_id);
		}
	
}
