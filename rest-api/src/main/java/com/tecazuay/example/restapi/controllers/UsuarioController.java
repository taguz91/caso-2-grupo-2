package com.tecazuay.example.restapi.controllers;

import com.tecazuay.example.restapi.models.Rol;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.RolRepository;
import com.tecazuay.example.restapi.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private RolRepository rolRepository;

	@GetMapping(value = "/test")
	public Object test() {

		Rol rol = new Rol(1, "Coordinador");
		rolRepository.save(rol);
		Usuario usuario = new Usuario(1, "Andrés Sapatanga", "example", "example", "123123123");
		usuario.setRol(rol);
		usuarioRepository.save(usuario);

		return usuarioRepository.findAll();
	}
}