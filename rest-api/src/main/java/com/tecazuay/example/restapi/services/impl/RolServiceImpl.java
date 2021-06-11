package com.tecazuay.example.restapi.services.impl;

import java.util.List;

import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import com.tecazuay.example.restapi.models.Rol;
import com.tecazuay.example.restapi.repositories.RolRepository;
import com.tecazuay.example.restapi.services.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolServiceImpl implements RolService {

	@Autowired
	private RolRepository rolRepository;

	@Override
	public List<Rol> findAll() {
		return this.rolRepository.listAvaliable();
	}

	@Override
	public Rol findById(Long id) {

		Rol rol = this.rolRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("No encontramos el rol."));
		return rol;
	}
}
