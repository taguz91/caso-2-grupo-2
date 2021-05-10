package com.tecazuay.example.restapi.services;

import java.util.Optional;

import com.tecazuay.example.restapi.models.Usuario;

public interface JwtService {

	String toToken(Usuario user);

	Optional<String> getSubFromToken(String token);
}
