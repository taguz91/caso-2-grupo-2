package com.tecazuay.example.restapi.controllers;

import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.LoginParam;
import com.tecazuay.example.restapi.definitions.UsuarioToken;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.UsuarioRepository;
import com.tecazuay.example.restapi.services.JwtService;
import com.tecazuay.example.restapi.services.UsuarioService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private JwtService jwtService;

	@PostMapping(value = "/{rolId}")
	public ResponseEntity<Usuario> createUser(@RequestBody Usuario usuario, @PathVariable Long rolId) {
		return ResponseEntity.status(HttpStatus.OK).body(this.usuarioService.save(usuario, rolId));
	}

	@GetMapping(value = "/")
	public ResponseEntity<List<Usuario>> readAllUsers() {
		return ResponseEntity.status(HttpStatus.OK).body(this.usuarioService.findAll());
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Usuario> readUserById(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(this.usuarioService.findById(id));
	}

	@PutMapping(value = "/")
	public ResponseEntity<Usuario> updateUser(@RequestBody Usuario usuario) {
		return ResponseEntity.status(HttpStatus.OK).body(this.usuarioService.update(usuario));
	}

	@PutMapping(value = "/{usuarioId}/{rolId}")
	public ResponseEntity<Usuario> updateUserRol(@PathVariable Long usuarioId, @PathVariable Long rolId) {
		return ResponseEntity.status(HttpStatus.OK).body(this.usuarioService.updateRol(usuarioId, rolId));
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Usuario> deleteUser(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(this.usuarioService.deleteById(id));
	}

	@PostMapping("/login/admin")
	public ResponseEntity<UsuarioToken> devLogin(@Valid @RequestBody LoginParam login) {
		Usuario user = usuarioRepository.findByCorreoAndPassword(login.getCorreo(), login.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Correo o contraseña incorrectos."));
				
		UsuarioToken userToken = new UsuarioToken(user, jwtService.toToken(user));
		user.setToken(userToken.getToken());
		usuarioRepository.save(user);

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(userToken);
	}
}