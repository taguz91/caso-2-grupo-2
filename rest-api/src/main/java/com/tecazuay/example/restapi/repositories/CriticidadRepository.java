package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.definitions.CriticidadCombo;
import com.tecazuay.example.restapi.models.Criticidad;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CriticidadRepository extends JpaRepository<Criticidad, Long> {

	@Query(value = "SELECT criticidad_id, nombre FROM criticidad ", nativeQuery = true)
	List<CriticidadCombo> findAllCombo();

}
