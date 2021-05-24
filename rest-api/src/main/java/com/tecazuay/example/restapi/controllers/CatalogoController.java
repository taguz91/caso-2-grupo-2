package com.tecazuay.example.restapi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

import javax.validation.Valid;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.CatalogoParam;
import com.tecazuay.example.restapi.definitions.CatalogoResponse;
import com.tecazuay.example.restapi.definitions.PageResponse;
import com.tecazuay.example.restapi.models.Catalogo;
import com.tecazuay.example.restapi.models.Criticidad;
import com.tecazuay.example.restapi.models.Parametros;
import com.tecazuay.example.restapi.models.SLA;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.CatalogoRepository;
import com.tecazuay.example.restapi.repositories.CriticidadRepository;
import com.tecazuay.example.restapi.repositories.ParametrosRepository;
import com.tecazuay.example.restapi.repositories.SLARepository;
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

	@Autowired
	CriticidadRepository criticidadRepository;

	@Autowired
	SLARepository slaRepository;

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
	public ResponseEntity<Catalogo> saveCatalago(@RequestBody @Valid CatalogoParam catalogoParam) {
		Catalogo catalogo = mapFromParam(catalogoParam, new Catalogo());
		return ResponseEntity.status(HttpStatus.CREATED).body(catalogo);
	}

	@PutMapping("/catalogo/{id}")
	public ResponseEntity<Catalogo> updateCatalago(@PathVariable("id") Long catalogo_id,
			@Valid @RequestBody CatalogoParam catalogoParam) {
		Catalogo catalogo = catalogoRepository.findById(catalogo_id)
				.orElseThrow(() -> new ResourceNotFoundException("No se encontro el catalogo"));

		return ResponseEntity.status(HttpStatus.OK).body(catalogo);
	}

	@DeleteMapping("/catalogo/{id}")
	public void deleteCatalago(@PathVariable("id") Long catalogo_id) {
		catalogoRepository.deleteById(catalogo_id);
	}

	private Catalogo mapFromParam(CatalogoParam catalogoParam, Catalogo catalogo) {
		catalogo.setDescripcion(catalogoParam.getDescripcion());

		Criticidad criticidad = criticidadRepository.findById(catalogoParam.getCriticidad())
				.orElseThrow(() -> new ResourceNotFoundException("No existe la criticidad."));

		Parametros impacto = parametroRepository.findByIdAndType(catalogoParam.getImpacto(), Types.PARAMETROS_IMPACTO)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el nivel de impacto."));

		Parametros nivelPrioridad = parametroRepository
				.findByIdAndType(catalogoParam.getNivelPrioridad(), Types.PARAMETROS_NIVEL_PRIORIDAD)
				.orElseThrow(() -> new ResourceNotFoundException("No existe el nivel del prioridad."));

		catalogo.setServicio(servicioRepository.findById(catalogoParam.getServicio_id()).get());
		catalogo.setTipoServicio(parametroRepository.findById(catalogoParam.getTipo_servicio_id()).get());

		SLA sla = catalogo.getSla();
		if (sla == null) {
			sla = new SLA();
		}

		sla.setCriticidad(criticidad);
		sla.setImpacto(impacto);
		sla.setNivelPrioridad(nivelPrioridad);

		Catalogo newCatalogo = catalogoRepository.save(catalogo);
		sla.setCatalogo(newCatalogo);
		slaRepository.save(sla);

		return catalogoRepository.findById(newCatalogo.getCatalogo_id()).get();
	}

	@GetMapping(value = "/tipo/{idTipo}")
	public ResponseEntity<PageResponse> byTipoServicio(@PathVariable("idTipo") Long idTipo,
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "20") int size) {

		Pageable pageable = PageRequest.of(page, size);

		Page<CatalogoResponse> catalogos = catalogoRepository.findAllByTipo(idTipo, pageable.getOffset(),
				pageable.getPageSize(), pageable);
		return ResponseEntity.status(HttpStatus.OK).body(new PageResponse(catalogos));
	}

}
