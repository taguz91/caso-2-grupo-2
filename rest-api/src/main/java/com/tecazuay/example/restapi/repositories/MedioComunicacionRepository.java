package com.tecazuay.example.restapi.repositories;
import java.util.List;
import com.tecazuay.example.restapi.models.MedioComunicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MedioComunicacionRepository extends JpaRepository<MedioComunicacion, Long> {
    @Query(value = "Select m from medio_comunicacion m where m.ticket_id = :ticket_id")
    public List<MedioComunicacion> findAllByTicket(@Param("ticket_id") Long ticket_id);
    
}