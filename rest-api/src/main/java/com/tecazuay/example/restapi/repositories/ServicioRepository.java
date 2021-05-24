package com.tecazuay.example.restapi.repositories;

import java.util.List;

import com.tecazuay.example.restapi.definitions.ServicioCombo;
import com.tecazuay.example.restapi.definitions.ServicioResponse;
import com.tecazuay.example.restapi.models.Servicio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {

	@Query("SELECT s FROM servicio s WHERE categoria_id = :categoria_id")
	List<ServicioResponse> findAllByCategoriaId(Long categoria_id);

	@Query("SELECT s FROM servicio s")
	List<ServicioResponse> findAllServicios();
	
	@Query(value = "SELECT servicio_id, nombre_servicio AS nombre FROM servicio", nativeQuery = true)
	List<ServicioCombo> findAllCombo();
}
