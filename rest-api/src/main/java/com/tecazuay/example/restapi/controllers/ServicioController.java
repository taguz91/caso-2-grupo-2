package com.tecazuay.example.restapi.controllers;

import java.util.List;

import javax.validation.Valid;

import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.ServicioParam;
import com.tecazuay.example.restapi.definitions.PageResponse;
import com.tecazuay.example.restapi.definitions.ServicioCombo;
import com.tecazuay.example.restapi.definitions.ServicioResponse;
import com.tecazuay.example.restapi.models.Categoria;
import com.tecazuay.example.restapi.models.Servicio;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.CategoriaRepository;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/servicios")
public class ServicioController {

	@Autowired
	private ServicioRepository servicioRepository;

	@Autowired
	private CategoriaRepository categoriaRepository;

	@GetMapping("/")
	public ResponseEntity<PageResponse> getAll(@AuthenticationPrincipal Usuario user,
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "20") int size) {
		AuthorizationService.onlyAdminOrDev(user);
		Pageable pageable = PageRequest.of(page, size);

		Page<Servicio> servicios = servicioRepository.findAll(pageable);
		return ResponseEntity.status(HttpStatus.OK).body(new PageResponse(servicios));
	}

	@GetMapping("/{id}")
	public Servicio getServicioById(@PathVariable(value = "id") Long servicio_id) {
		return servicioRepository.findById(servicio_id).orElseThrow(
				() -> new ResourceNotFoundException("No se encontro el servicio con el id: " + servicio_id));
	}


	@GetMapping("/categoria/{id}")
	public List<ServicioResponse> getAllByCategoriaId(@PathVariable("id") Long categoria_id) {
		Categoria categoria = categoriaRepository.findByCategoriaId(categoria_id)
				.orElseThrow(() -> new ResourceNotFoundException("Esta categoria no esta registrada"));
		return servicioRepository.findAllByCategoriaId(categoria.getCategoria_id());
	}

	@PostMapping("/")
	public Servicio saveServicio(@RequestBody @Valid ServicioParam servicioParam) {
		Categoria categoria = categoriaRepository.findById(servicioParam.getCategoriaId())
				.orElseThrow(() -> new ResourceNotFoundException("No se encontro la categoria"));

		Servicio servicio = new Servicio();
		servicio.setNombre_servicio(servicioParam.getNombre_servicio());
		servicio.setCategoria(categoria);
		return servicioRepository.save(servicio);
	}

	@PutMapping("/{id}")
	public Servicio updateServicio(@PathVariable(value = "id") Long servicio_id,
			@Valid @RequestBody ServicioParam newServicio) {
		Servicio servicio = servicioRepository.findById(servicio_id)
				.orElseThrow(() -> new ResourceNotFoundException("No se encontro el servicio con id: " + servicio_id));

		Categoria categoria = categoriaRepository.findById(newServicio.getCategoriaId())
				.orElseThrow(() -> new ResourceNotFoundException("No se encontro la categoria"));

		servicio.setNombre_servicio(newServicio.getNombre_servicio());

		servicio.setCategoria(categoria);
		return servicioRepository.save(servicio);
	}

	@DeleteMapping("/{id}")
	public boolean deleteServicio(@PathVariable(value = "id") Long servicio_id) {
		servicioRepository.findById(servicio_id)
				.orElseThrow(() -> new ResourceNotFoundException("No se encontro el servicio con Id: " + servicio_id));
		servicioRepository.deleteById(servicio_id);
		return true;
	}

	@GetMapping("/combo")
	public ResponseEntity<List<ServicioCombo>> getCombo() {
		return ResponseEntity.status(HttpStatus.OK).body(servicioRepository.findAllCombo());
	}

}
