package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    
}