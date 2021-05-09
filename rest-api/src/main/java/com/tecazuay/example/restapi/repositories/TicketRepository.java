package com.tecazuay.example.restapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tecazuay.example.restapi.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

}
