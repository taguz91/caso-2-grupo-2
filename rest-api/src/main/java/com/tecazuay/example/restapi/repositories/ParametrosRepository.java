package com.tecazuay.example.restapi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tecazuay.example.restapi.definitions.ParametrosResponse;
import com.tecazuay.example.restapi.models.Parametros;

@Repository
public interface ParametrosRepository extends JpaRepository<Parametros, Long> {

	@Query(value = "SELECT p FROM parametros p WHERE p.type = :type")
	List<Parametros> findAllByType(@Param("type") int type);
	
	@Query(value = "SELECT parametros_id, nombre,  descripcion FROM parametros WHERE type = :type", nativeQuery = true)
	List<ParametrosResponse> findParametrosByType(int type);
}
