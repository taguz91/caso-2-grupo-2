package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.Adjunto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AdjuntoRepository extends JpaRepository<Adjunto, Long> {

	@Transactional
	@Modifying
	@Query(value = "UPDATE adjuntos a SET a.isDeleted = true WHERE a.adjunto_id = :idAdjunto")
	Adjunto softDeleteById(@Param("idAdjunto") Long idAdjunto);

}