package com.tecazuay.example.restapi.services;

import java.util.List;

import com.tecazuay.example.restapi.api.params.UsuarioParam;
import com.tecazuay.example.restapi.models.Usuario;

public interface UsuarioService {
    
    Usuario findById(Long id);

    List<Usuario> findAll();

    Usuario save(UsuarioParam usuarioParam, Long rolId);

    Usuario update(UsuarioParam usuarioParam);

    Usuario deleteById(Long id);

    Usuario updateRol(Long userId, Long rolId);
}
