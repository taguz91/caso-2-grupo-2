package com.tecazuay.example.restapi.repositories;

import java.util.Optional;

import javax.transaction.Transactional;

import com.tecazuay.example.restapi.definitions.CategoriaResponse;
import com.tecazuay.example.restapi.models.Categoria;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

	@Query("SELECT c FROM categoria c WHERE categoria_id = :categoria_id")
	Optional<Categoria> findByCategoriaId(Long categoria_id);

	@Query("SELECT c FROM categoria c")
	Page<CategoriaResponse> findAllCategoria(Pageable pageable);
	
	@Query("SELECT c FROM categoria c WHERE UPPER(c.nombre_categoria) LIKE CONCAT('%',UPPER(:nombre_categoria),'%')")
	Optional<Categoria> findByNombreCategoria(String nombre_categoria);

	@Transactional
	@Modifying
	@Query(value = "UPDATE categoria c SET c.isDeleted = true WHERE c.categoria_id = :categoria_id")
	int softDeleteById(@Param("categoria_id")Long categoria_id);

}
