package com.tecazuay.example.restapi.services.impl;

import java.util.List;
import java.util.Optional;
import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.api.params.UsuarioEditParam;
import com.tecazuay.example.restapi.api.params.UsuarioParam;
import com.tecazuay.example.restapi.models.ResponseModel;
import com.tecazuay.example.restapi.models.Rol;
import com.tecazuay.example.restapi.models.Usuario;
import com.tecazuay.example.restapi.repositories.UsuarioRepository;
import com.tecazuay.example.restapi.services.EmailServiceImpl;
import com.tecazuay.example.restapi.services.JwtService;
import com.tecazuay.example.restapi.services.RolService;
import com.tecazuay.example.restapi.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private RolService rolService;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private EmailServiceImpl emailService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public Usuario findById(Long id) {
		Optional<Usuario> uOptional = this.usuarioRepository.findById(id);

		if (uOptional.isPresent()) {
			return uOptional.get();
		} else {
			return null;
		}
	}

	@Override
	public Page<Usuario> findAll(Pageable pageable) {
		return this.usuarioRepository.findAllPage(pageable);
	}

	@Override
	public ResponseModel save(UsuarioParam up, Long rolId) {
		
		Usuario usuario = new Usuario(null, up.getCedula(), up.getNombres(), up.getApellidos(), up.getCorreo(), passwordEncoder.encode(up.getPassword()), up.getTelefono());

		if (this.findByCedula(usuario.getCedula()) == null) {
			if (this.findByEmail(usuario.getCorreo()) == null) {

				Rol rol = this.rolService.findById(rolId);

				if (rol != null) {


					usuario.setRol(rol);
					usuario.setToken(jwtService.toToken(usuario));
					Usuario userRegistered = this.usuarioRepository.save(usuario);
					
					if (rol.getRolId() == Types.ROL_USUARIO || rol.getRolId() == Types.ROL_DEVELOPER) {
						emailService.sendRegister(userRegistered);
					}

					return new ResponseModel(true, userRegistered, "Usuario registrado");
				} else { return new ResponseModel(false, null, "Rol inexistente"); }
			} else { return new ResponseModel(false, null, "Correo existente"); }
		} else { return new ResponseModel(false, null, "Cédula existente"); }
	}

	@Override
	public ResponseModel update(UsuarioEditParam up) {

		Usuario uCedula = this.findByCedula(up.getCedula());
		Usuario uCorreo = this.findByEmail(up.getCorreo());

		if (uCedula == null || uCedula.getPersonaId().equals(up.getPersonaId())) {

			if (uCorreo == null || uCorreo.getPersonaId().equals(up.getPersonaId())) {
				
				Usuario user = this.findById(up.getPersonaId());

				if (user != null) {
						
					user.setCedula(up.getCedula());
					user.setApellidos(up.getApellidos());
					user.setNombres(up.getNombres());
					user.setCorreo(up.getCorreo());
					user.setTelefono(up.getTelefono());

					if (!up.getPassword().isEmpty() && !up.getPassword().isBlank() && up.getPassword().length() > 8) {
						user.setPassword(up.getPassword());
					}
								
					return new ResponseModel(true, this.usuarioRepository.save(user), "Usuario Actualizado");

				} else { return new ResponseModel(false, null, "Usuario inexistente");	}
			} else { return new ResponseModel(false, null, "Correo existente"); }
		} else { return new ResponseModel(false, null, "Cédula existente"); }
	}

	@Override
	public Usuario deleteById(Long usuarioId) {
		Usuario user = this.findById(usuarioId);

		if (user != null) {
			user.setDeleted(true);
			return this.usuarioRepository.save(user);
		} else {
			return null;
		}
	}

	@Override
	public Usuario updateRol(Long userId, Long rolId) {

		Usuario user = this.findById(userId);
		Rol rol = this.rolService.findById(rolId);

		if (user != null && rol != null) {
			user.setRol(rol);
			return this.usuarioRepository.save(user);
		} else {
			return null;
		}
	}

	@Override
	public List<Usuario> findAllByRol(Long rolId) {

		Rol rol = this.rolService.findById(rolId);

		if (rol != null) {
			return this.usuarioRepository.findAllByRol(rol);
		} else {
			return null;
		}
	}

	@Override
	public Usuario findByCedula(String cedula) {
		return this.usuarioRepository.findByCedula(cedula);
	}

	@Override
	public Usuario findByEmail(String correo) {
		return this.usuarioRepository.findByEmail(correo);
	}
}