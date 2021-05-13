package com.tecazuay.example.restapi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tecazuay.example.restapi.definitions.TicketsList;
import com.tecazuay.example.restapi.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

	@Query(value = "SELECT t FROM ticket t WHERE t.usuario.personaId = :userId")
	List<Ticket> findAllByUser(@Param("userId") Long userId);

	@Query(value = "SELECT t FROM ticket t WHERE t.responsable.personaId = :responsableId")
	List<Ticket> findAllByResponsable(@Param("responsableId") Long responsableId);

	@Query(value = "SELECT t FROM ticket t WHERE t.estado.parametros_id = :estado_id")
	List<Ticket> findAllByEstado(@Param("estado_id") Long estadoId);

	@Query(value = "SELECT " + "t.ticket_id, " + "t.titulo, " + "pe.nombre AS estado, " + "pt.nombre AS tipo "
			+ "FROM public.ticket t  " + "JOIN public.parametros pe ON pe.parametros_id = t.estado_id "
			+ "JOIN public.catalogo c ON c.catalogo_id = t.catalogo_id "
			+ "JOIN public.parametros pt ON pt.parametros_id = c.tipo_servicio_id "
			+ "WHERE t.usuario_id = :userId ", nativeQuery = true)
	List<TicketsList> findAllByUserHome(@Param("userId") Long userId);

	@Query(value = "SELECT  " + "t.ticket_id, " + "t.titulo, " + "pe.nombre AS estado, " + "pt.nombre AS tipo "
			+ "FROM public.ticket t  " + "JOIN public.parametros pe ON pe.parametros_id = t.estado_id "
			+ "JOIN public.catalogo c ON c.catalogo_id = t.catalogo_id "
			+ "JOIN public.parametros pt ON pt.parametros_id = c.tipo_servicio_id "
			+ "JOIN public.sla sla ON sla.catalogo_id = sla.catalogo_id "
			+ "JOIN public.criticidad cr ON sla.criticidad_id = cr.criticidad_id  "
			+ "WHERE pe.parametros_id = :estadoId " + "ORDER BY cr.valor DESC;", nativeQuery = true)
	List<TicketsList> findAllByEstadoHome(@Param("estadoId") Long estadoId);
}
