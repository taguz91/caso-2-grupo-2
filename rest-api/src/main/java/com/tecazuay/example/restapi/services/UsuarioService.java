package com.tecazuay.example.restapi.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import com.tecazuay.example.restapi.api.params.UsuarioEditParam;
import com.tecazuay.example.restapi.api.params.UsuarioParam;
import com.tecazuay.example.restapi.models.ResponseModel;
import com.tecazuay.example.restapi.models.Usuario;

public interface UsuarioService {

	Usuario findById(Long id);

	Page<Usuario> findAll(Pageable pageable);

	ResponseModel save(UsuarioParam usuarioParam, Long rolId);
	
	ResponseModel update(UsuarioEditParam usuarioParam);
	
	Usuario deleteById(Long id);
	
	Usuario updateRol(Long userId, Long rolId);

	List<Usuario> findAllByRol(Long rolId);

	Usuario findByCedula(String cedula);

	Usuario findByEmail(String correo);
}