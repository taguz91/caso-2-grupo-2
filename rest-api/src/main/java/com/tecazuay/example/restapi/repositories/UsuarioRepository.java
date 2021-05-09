package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	@Query(value = "SELECT u FROM usuarios u WHERE u.correo = :correo AND u.password = :password")
	Optional<Usuario> findByCorreoAndPassword(@Param("correo") String correo, @Param("password") String password);

}