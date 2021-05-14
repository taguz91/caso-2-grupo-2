package com.tecazuay.example.restapi.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tecazuay.example.restapi.definitions.TicketsList;
import com.tecazuay.example.restapi.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

	static final String QUERY_HOME_USER = "FROM public.ticket t  "
			+ "JOIN public.parametros pe ON pe.parametros_id = t.estado_id "
			+ "JOIN public.catalogo c ON c.catalogo_id = t.catalogo_id "
			+ "JOIN public.parametros pt ON pt.parametros_id = c.tipo_servicio_id " + "WHERE t.usuario_id = :userId ";

	@Query(value = "SELECT t FROM ticket t WHERE t.usuario.personaId = :userId")
	Page<Ticket> findAllByUser(@Param("userId") Long userId, Pageable pageable);

	@Query(value = "SELECT t FROM ticket t WHERE t.responsable.personaId = :responsableId")
	Page<Ticket> findAllByResponsable(@Param("responsableId") Long responsableId, Pageable pageable);

	@Query(value = "SELECT t FROM ticket t WHERE t.estado.parametros_id = :estado_id")
	List<Ticket> findAllByEstado(@Param("estado_id") Long estadoId);

	@Query(value = "SELECT " + "t.ticket_id, " + "t.titulo, " + "pe.nombre AS estado, " + "pt.nombre AS tipo "
			+ QUERY_HOME_USER
			+ "ORDER BY t.created_at DESC \n-- #pageable\n", countQuery = "SELECT count(*) FROM public.ticket t WHERE t.usuario_id = :userId", nativeQuery = true)
	Page<TicketsList> findAllByUserHome(@Param("userId") Long userId, Pageable pageable);

	@Query(value = "SELECT  " + "t.ticket_id, " + "t.titulo, " + "pe.nombre AS estado, " + "pt.nombre AS tipo "
			+ "FROM public.ticket t  " + "JOIN public.parametros pe ON pe.parametros_id = t.estado_id "
			+ "JOIN public.catalogo c ON c.catalogo_id = t.catalogo_id "
			+ "JOIN public.parametros pt ON pt.parametros_id = c.tipo_servicio_id "
			+ "JOIN public.sla sla ON sla.catalogo_id = sla.catalogo_id "
			+ "JOIN public.criticidad cr ON sla.criticidad_id = cr.criticidad_id  "
			+ "WHERE pe.parametros_id = :estadoId "
			+ "ORDER BY cr.valor DESC \n-- #pageable\n;", countQuery = "SELECT count(*) FROM public.ticket t WHERE t.estado_id = :estadoId", nativeQuery = true)
	Page<TicketsList> findAllByEstadoHome(@Param("estadoId") Long estadoId, Pageable pageable);
}
