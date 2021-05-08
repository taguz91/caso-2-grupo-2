package com.tecazuay.example.restapi.api;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.tecazuay.example.restapi.services.JwtService;

public class JwtTokenFilter extends OncePerRequestFilter {

	private String header = "Authorization";

	@Autowired
	private JwtService jwtService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		getTokenString(request.getHeader(header)).ifPresent(token -> {
			jwtService.getSubFromToken(token).ifPresent(id -> {
				if (SecurityContextHolder.getContext().getAuthentication() == null) {
//					TODO: Implement methods with person
//					userRepository.findById(id).ifPresent(user -> {
//						UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//								user, null, Collections.emptyList());
//						authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//						SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//					});
				}
			});
		});

		filterChain.doFilter(request, response);

	}

	private Optional<String> getTokenString(String header) {
		if (header == null) {
			return Optional.empty();
		} else {
			String[] split = header.split(" ");
			if (split.length < 2) {
				return Optional.empty();
			} else {
				return Optional.ofNullable(split[1]);
			}
		}
	}

}
