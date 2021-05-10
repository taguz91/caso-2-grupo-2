package com.tecazuay.example.restapi.services;

import java.util.List;
import com.tecazuay.example.restapi.models.Usuario;

public interface UsuarioService {
    
    Usuario findById(Long id);

    List<Usuario> findAll();

    Usuario save(Usuario usuario, Long rolId);

    Usuario update(Usuario id);

    Usuario deleteById(Long id);

    Usuario updateRol(Long userId, Long rolId);
}
