package com.tecazuay.example.restapi.controllers;

import com.tecazuay.example.restapi.api.exception.NoAuthorizationException;
import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.LoginParam;
import com.tecazuay.example.restapi.api.params.UsuarioEditParam;
import com.tecazuay.example.restapi.api.params.UsuarioParam;
import com.tecazuay.example.restapi.definitions.PageResponse;
import com.tecazuay.example.restapi.definitions.TicketCountChart;
import com.tecazuay.example.restapi.definitions.UserList;
import com.tecazuay.example.restapi.definitions.UsuarioToken;
import com.tecazuay.example.restapi.models.ResponseModel;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.UsuarioRepository;
import com.tecazuay.example.restapi.services.AuthorizationService;
import com.tecazuay.example.restapi.services.JwtService;
import com.tecazuay.example.restapi.services.UsuarioService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin("*")
@RequestMapping("/api/v1/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping(value = "/{id}")
	public ResponseEntity<ResponseModel> createUser(@Validated @RequestBody UsuarioParam usuario, @PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(this.usuarioService.save(usuario, id));
	}

	@GetMapping(value = "/")
	public ResponseEntity<PageResponse> readAllUsers(@AuthenticationPrincipal Usuario user,
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "20") int size) {
		AuthorizationService.onlyAdminOrDev(user);
		Pageable pageable = PageRequest.of(page, size);

		return ResponseEntity.status(HttpStatus.OK).body(new PageResponse(this.usuarioService.findAll(pageable)));
	}

	@GetMapping(value = "/rol/{rolId}")
	public ResponseEntity<List<Usuario>> readAllUsersByRol(@PathVariable Long rolId) {
		return ResponseEntity.status(HttpStatus.OK).body(this.usuarioService.findAllByRol(rolId));
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<Usuario> readUserById(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(this.usuarioService.findById(id));
	}

	@GetMapping(value = "/cedula/{cedula}")
	public ResponseEntity<Usuario> readUserByCedula(@PathVariable String cedula) {
		return ResponseEntity.status(HttpStatus.OK).body(this.usuarioService.findByCedula(cedula));
	}

	@PutMapping(value = "/")
	public ResponseEntity<ResponseModel> updateUser(@Validated @RequestBody UsuarioEditParam usuario) {
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

	@PostMapping("/login")
	public ResponseEntity<UsuarioToken> devLogin(@Valid @RequestBody LoginParam login) {
		Usuario user = usuarioRepository.findByCorreo(login.getCorreo())
				.orElseThrow(() -> new ResourceNotFoundException("Usuario no registrado."));

		if (!passwordEncoder.matches(login.getPassword(), user.getPassword())) {
			throw new ResourceNotFoundException("Usuario o contrase??a incorrectos.");
		}

		UsuarioToken userToken = new UsuarioToken(user, jwtService.toToken(user));
		user.setToken(userToken.getToken());
		usuarioRepository.save(user);

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(userToken);
	}

	@GetMapping("/loged")
	public ResponseEntity<UsuarioToken> info(@AuthenticationPrincipal Usuario user) {
		if (user == null) {
			throw new NoAuthorizationException("Debe iniciar sessi??n.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(new UsuarioToken(user, jwtService.toToken(user)));
	}

	@GetMapping("/combo/type/{idRol}")
	public ResponseEntity<List<UserList>> comboByType(@PathVariable Long idRol) {
		return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.findAllComboByUserType(idRol));
	}

	@GetMapping("/chart/actual")
	public ResponseEntity<List<TicketCountChart>> countByAuthUser(@AuthenticationPrincipal Usuario user) {
		if (user == null) {
			throw new NoAuthorizationException("Debe iniciar sessi??n.");
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(usuarioRepository.countTicketsEstadoByUser(user.getPersonaId()));
	}

	@GetMapping("/exists")
	public ResponseEntity<Usuario> existClient(@AuthenticationPrincipal Usuario user,
			@RequestParam(value = "q") String q) {
		AuthorizationService.onlyPersonal(user);

		return ResponseEntity.status(HttpStatus.OK).body(usuarioRepository.findByIndentificationOrCorreo(q));
	}
}