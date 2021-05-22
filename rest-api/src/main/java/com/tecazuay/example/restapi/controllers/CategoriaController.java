package com.tecazuay.example.restapi.controllers;

import javax.validation.Valid;

import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.CategoriaParam;
import com.tecazuay.example.restapi.definitions.CategoriaResponse;
import com.tecazuay.example.restapi.definitions.PageResponse;
import com.tecazuay.example.restapi.models.Categoria;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.CategoriaRepository;
import com.tecazuay.example.restapi.services.AuthorizationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categorias")
public class CategoriaController {

	@Autowired
	CategoriaRepository categoriaRepository;

	@GetMapping(value = "/")
	public ResponseEntity<PageResponse> getAll(@AuthenticationPrincipal Usuario user,
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "20") int size) {

		AuthorizationService.onlyAdminOrDev(user);
		Pageable pageable = PageRequest.of(page, size);
		Page<Categoria> categorias = categoriaRepository.findAll(pageable);

		return ResponseEntity.status(HttpStatus.OK).body(new PageResponse(categorias));
	}

	@GetMapping("/{id}")
	public Categoria getCategoria(@PathVariable("id") Long categoria_id) {
		return categoriaRepository.findByCategoriaId(categoria_id)
				.orElseThrow(() -> new ResourceNotFoundException("No se encontro la categoria"));
	}

	@GetMapping("/nombre-categoria")
	public Categoria getByNombre(@RequestParam("nombre_categoria") String nombre_categoria){
		return categoriaRepository.findByNombreCategoria(nombre_categoria)
			.orElseThrow(() -> new ResourceNotFoundException("No se encontro la categoria"));		
	}

	@PostMapping(value = "/")
	public Categoria saveCategoria(@RequestBody @Valid CategoriaParam categoriaParam) {
		Categoria categoria = new Categoria();
		categoria.setNombre_categoria(categoriaParam.getNombre_categoria());
		return categoriaRepository.save(categoria);
	}

	@PutMapping("/{id}")
	public Categoria updateCategoria(@PathVariable("id") Long categoria_id,
			@Valid @RequestBody CategoriaParam newCategoria) {
		Categoria categoria = categoriaRepository.findById(categoria_id)
				.orElseThrow(() -> new ResourceNotFoundException("No se encontro la categoria"));

		categoria.setNombre_categoria(newCategoria.getNombre_categoria());
		return categoriaRepository.save(categoria);
		// .map(categoria -> {
		// categoria.setNombre_categoria(newCategoria.getNombre_categoria());
		// return categoriaRepository.save(newCategoria);
		// })
		// .orElseGet(()-> {
		// newCategoria.setCategoria_id(categoria_id);
		// return categoriaRepository.save(newCategoria);
		// });
		// .orElseThrow(() -> new ResourceNotFoundException("No se encontro la
		// categoria"));
	}

	@DeleteMapping("/{id}")
	public boolean deleteCategoria(@PathVariable("id") Long categoria_id) {
		Categoria categoria = categoriaRepository.findById(categoria_id)
				.orElseThrow(() -> new ResourceNotFoundException("No se encontro la categoria con id:" + categoria_id));
		categoriaRepository.deleteById(categoria.getCategoria_id());
		return true;
	}
}
