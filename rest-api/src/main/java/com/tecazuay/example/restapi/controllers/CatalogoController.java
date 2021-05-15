package com.tecazuay.example.restapi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

import javax.validation.Valid;

import com.tecazuay.example.restapi.api.params.CatalogoParam;
import com.tecazuay.example.restapi.definitions.PageResponse;
import com.tecazuay.example.restapi.models.Catalogo;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.CatalogoRepository;
import com.tecazuay.example.restapi.repositories.ParametrosRepository;
import com.tecazuay.example.restapi.repositories.ServicioRepository;
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

@RestController
@RequestMapping("/api/v1/catalogo")
public class CatalogoController {

	@Autowired
	CatalogoRepository catalogoRepository;

	@Autowired
	ParametrosRepository parametroRepository;

	@Autowired
	ServicioRepository servicioRepository;

	@GetMapping("/")
	public ResponseEntity<PageResponse> getAll(@AuthenticationPrincipal Usuario user,
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "20") int size) {
		AuthorizationService.onlyAdminOrDev(user);
		Pageable pageable = PageRequest.of(page, size);

		Page<Catalogo> catalogos = catalogoRepository.findAll(pageable);
		return ResponseEntity.status(HttpStatus.OK).body(new PageResponse(catalogos));
	}

	@GetMapping("/catalogo/{id}")
	public Optional<Catalogo> getCategoria(@PathVariable("id") Long catalogo_id) {
		return catalogoRepository.findById(catalogo_id);
	}

	@PostMapping("/catalogo")
	public Catalogo saveCatalago(@RequestBody @Valid CatalogoParam catalogoParam) {
		Catalogo catalogo = mapFromParam(catalogoParam);
		return catalogoRepository.save(catalogo);
	}

	@PutMapping("/catalogo/{id}")
	public Catalogo updateCatalago(@PathVariable("id") Long catalogo_id, @RequestBody Catalogo newCatalogo) {
		return catalogoRepository.findById(catalogo_id).map(catalogo -> {
			catalogo.setDescripcion(newCatalogo.getDescripcion());
			return catalogoRepository.save(newCatalogo);
		}).orElseGet(() -> {
			newCatalogo.setCatalogo_id(catalogo_id);
			return catalogoRepository.save(newCatalogo);
		});
	}

	@DeleteMapping("/catalogo/{id}")
	public void deleteCatalago(@PathVariable("id") Long catalogo_id) {
		catalogoRepository.deleteById(catalogo_id);
	}

	private Catalogo mapFromParam(CatalogoParam catalogoParam) {
		Catalogo catalogo = new Catalogo();
		catalogo.setDescripcion(catalogoParam.getDescripcion());

		catalogo.setServicio(servicioRepository.findById(catalogoParam.getServicio_id()).get());
		catalogo.setTipoServicio(parametroRepository.findById(catalogoParam.getTipo_servicio_id()).get());

		return catalogo;
	}

}
