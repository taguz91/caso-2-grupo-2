package com.tecazuay.example.restapi.controllers;

import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.LoginParam;
import com.tecazuay.example.restapi.definitions.UsuarioToken;
import com.tecazuay.example.restapi.models.Rol;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.RolRepository;
import com.tecazuay.example.restapi.repositories.UsuarioRepository;
import com.tecazuay.example.restapi.services.JwtService;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private RolRepository rolRepository;

	@Autowired
	private JwtService jwtService;

	@GetMapping(value = "/test")
	public Object test() {

		Rol rol = new Rol(1, "Coordinador");
		rolRepository.save(rol);
		Usuario usuario = new Usuario(1, "Andrés Sapatanga", "example", "example", "123123123");
		usuario.setRol(rol);
		usuarioRepository.save(usuario);

		return usuarioRepository.findAll();
	}

	@PostMapping("/login/admin")
	public ResponseEntity<?> devLogin(@Valid @RequestBody LoginParam login) {
		Usuario user = usuarioRepository.findByCorreoAndPassword(login.getCorreo(), login.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Correo o contraseña incorrectos."));

		// Generamos el nuevo token para el usuario y lo guardamos en su modelo
		UsuarioToken userToken = new UsuarioToken(user, jwtService.toToken(user));
		user.setToken(userToken.getToken());
		usuarioRepository.save(user);

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(userToken);
	}
}