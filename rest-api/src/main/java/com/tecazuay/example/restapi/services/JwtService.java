package com.tecazuay.example.restapi.services;

import java.util.Optional;

public interface JwtService {

	String toToken();

	Optional<String> getSubFromToken(String token);
}
