package com.tecazuay.example.restapi.repositories;

import java.util.Optional;

import com.tecazuay.example.restapi.definitions.CategoriaResponse;
import com.tecazuay.example.restapi.models.Categoria;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

	@Query("SELECT c FROM categoria c WHERE categoria_id = :categoria_id")
	Optional<CategoriaResponse> findByCategoriaId(Long categoria_id);

	@Query("SELECT c FROM categoria c")
	Page<CategoriaResponse> findAllCategoria(Pageable pageable);
}
