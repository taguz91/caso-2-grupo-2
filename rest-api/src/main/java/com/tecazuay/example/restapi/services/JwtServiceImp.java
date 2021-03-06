package com.tecazuay.example.restapi.services;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.tecazuay.example.restapi.models.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtServiceImp implements JwtService {

	private String secret;
	private int sessionTime;

	public JwtServiceImp(@Value("${jwt.secret}") String secret, @Value("${jwt.sessionTime}") int sessionTime) {
		this.secret = secret;
		this.sessionTime = sessionTime;
	}

	@Override
	public String toToken(Usuario user) {
		return Jwts.builder().setSubject(String.valueOf(user.getPersonaId()))
				.setExpiration(expireTimeFromNow())
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	@Override
	public Optional<String> getSubFromToken(String token) {
		try {
			Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
			return Optional.ofNullable(claimsJws.getBody().getSubject());
		} catch (Exception e) {
			return Optional.empty();
		}
	}

	private Date expireTimeFromNow() {
		return new Date(System.currentTimeMillis() + sessionTime * 1000);
	}

}
