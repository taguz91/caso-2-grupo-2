package com.tecazuay.example.restapi.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tecazuay.example.restapi.Types;
import com.tecazuay.example.restapi.definitions.TicketEstadoCount;
import com.tecazuay.example.restapi.definitions.TicketsList;
import com.tecazuay.example.restapi.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

	static final String QUERY_HOME_USER = "FROM public.ticket t  "
			+ "JOIN public.parametros pe ON pe.parametros_id = t.estado_id "
			+ "JOIN public.catalogo c ON c.catalogo_id = t.catalogo_id "
			+ "JOIN public.parametros pt ON pt.parametros_id = c.tipo_servicio_id " + "WHERE t.usuario_id = :userId ";

	static final String QUERY_SELECT_HOME = "SELECT  t.ticket_id, t.titulo, pe.nombre AS estado, pt.nombre AS tipo, t.created_at AS created_at ";

	static final String QUERY_PAGEABLE = "\n LIMIT :limitParam OFFSET :offset \n";

	@Query(value = "SELECT count(t) FROM ticket t WHERE t.catalogo.catalogo_id = ?1")
	long countByIdCatalogo(Long idCatalogo);

	@Query(value = "SELECT t FROM ticket t WHERE t.usuario.personaId = :userId")
	Page<Ticket> findAllByUser(@Param("userId") Long userId, Pageable pageable);

	@Query(value = "SELECT t FROM ticket t WHERE t.responsable.personaId = :responsableId")
	Page<Ticket> findAllByResponsable(@Param("responsableId") Long responsableId, Pageable pageable);

	@Query(value = "SELECT t FROM ticket t WHERE t.estado.parametros_id = :estado_id")
	Page<Ticket> findAllByEstado(@Param("estado_id") Long estadoId, Pageable pageable);

	@Query(value = QUERY_SELECT_HOME + QUERY_HOME_USER + "ORDER BY t.created_at DESC " + QUERY_PAGEABLE
			+ " \n-- #pageable\n", countQuery = "SELECT count(*) FROM public.ticket t WHERE t.usuario_id = :userId", nativeQuery = true)
	Page<TicketsList> findAllByUserHome(@Param("userId") Long userId, @Param("offset") long offset,
			@Param("limitParam") int limitParam, Pageable pageable);

	@Query(value = QUERY_SELECT_HOME + "FROM public.ticket t  "
			+ "JOIN public.parametros pe ON pe.parametros_id = t.estado_id "
			+ "JOIN public.catalogo c ON c.catalogo_id = t.catalogo_id "
			+ "JOIN public.parametros pt ON pt.parametros_id = c.tipo_servicio_id "
			+ "JOIN public.sla sla ON sla.catalogo_id = t.catalogo_id "
			+ "JOIN public.criticidad cr ON sla.criticidad_id = cr.criticidad_id  "
			+ "WHERE pe.parametros_id = :estadoId " + "ORDER BY cr.valor DESC " + QUERY_PAGEABLE
			+ " \n-- #pageable\n;", countQuery = "SELECT count(*) FROM public.ticket t WHERE t.estado_id = :estadoId", nativeQuery = true)
	Page<TicketsList> findAllByEstadoHome(@Param("estadoId") Long estadoId, @Param("offset") long offset,
			@Param("limitParam") int limitParam, Pageable pageable);

	@Query(value = QUERY_SELECT_HOME + "FROM public.ticket t  "
			+ "JOIN public.parametros pe ON pe.parametros_id = t.estado_id "
			+ "JOIN public.catalogo c ON c.catalogo_id = t.catalogo_id "
			+ "JOIN public.parametros pt ON pt.parametros_id = c.tipo_servicio_id "
			+ "JOIN public.sla sla ON sla.catalogo_id = t.catalogo_id "
			+ "JOIN public.criticidad cr ON sla.criticidad_id = cr.criticidad_id  "
			+ "WHERE t.responsable_id = :idSoporte " + "AND pe.parametros_id =  " + Types.PARAMETROS_ESTADO_ATENDIENDOSE
			+ " " + "ORDER BY cr.valor DESC " + QUERY_PAGEABLE
			+ " \n-- #pageable\n;", countQuery = "SELECT count(*) FROM public.ticket t WHERE t.estado_id = :estadoId", nativeQuery = true)
	Page<TicketsList> findAllByResponsableHome(@Param("idSoporte") Long idSoporte, @Param("offset") long offset,
			@Param("limitParam") int limitParam, Pageable pageable);

	@Query(value = "SELECT date_part('dow', t.updated_at) AS day, COUNT(estado_id) AS total, estado_id\r\n"
			+ "FROM ticket t\r\n" + "WHERE t.updated_at > now() - interval '1 week'  \r\n"
			+ "GROUP BY estado_id, date_part('dow', t.updated_at)\r\n"
			+ "ORDER BY \"day\", estado_id", nativeQuery = true)
	List<TicketEstadoCount> reportCountLastWeek();
	
	@Query(value = "SELECT t FROM ticket t WHERE LOWER( CONCAT(t.titulo, ' ', t.descripcion, ' ', t.solucion, ' ', t.usuario.nombres, ' ', t.usuario.apellidos) ) LIKE %?1%")
	Page<Ticket> search(String q, Pageable pageable);
}
