package com.tecazuay.example.restapi.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tecazuay.example.restapi.api.params.UsuarioEditParam;
import com.tecazuay.example.restapi.api.params.UsuarioParam;
import com.tecazuay.example.restapi.models.Usuario;

public interface UsuarioService {

	Usuario findById(Long id);

	Page<Usuario> findAll(Pageable pageable);

	Usuario save(UsuarioParam usuarioParam, Long rolId);

	Usuario update(UsuarioEditParam usuarioParam);

	Usuario deleteById(Long id);

	Usuario updateRol(Long userId, Long rolId);
}
