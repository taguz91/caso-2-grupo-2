package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.EncuestaSatisfacion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository 
public interface EncuestaRepository extends JpaRepository<EncuestaSatisfacion, Long>{

    @Query("SELECT c FROM encuesta_satisfaccion c WHERE  c.ticket.ticket_id =?1")
    EncuestaSatisfacion existsByTicket(Long idTicket);
}
