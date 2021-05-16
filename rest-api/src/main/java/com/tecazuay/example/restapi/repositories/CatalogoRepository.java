package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.definitions.CatalogoResponse;
import com.tecazuay.example.restapi.models.Catalogo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogoRepository extends JpaRepository<Catalogo, Long> {

	@Query(value = "SELECT c.catalogo_id, c.descripcion FROM public.catalogo c WHERE c.tipo_servicio_id = :idTipoServicio AND c.is_deleted = false ORDER BY descripcion ASC \n LIMIT :limitParam OFFSET :offset \n-- #pageable\n", nativeQuery = true, countQuery = "SELECT count(*) FROM public.catalogo c WHERE c.tipo_servicio_id = :idTipoServicio AND c.is_deleted = false")
	Page<CatalogoResponse> findAllByTipo(@Param("idTipoServicio") Long idTipoServicio, @Param("offset") long offset,
			@Param("limitParam") int limitParam, Pageable pageable);

}
