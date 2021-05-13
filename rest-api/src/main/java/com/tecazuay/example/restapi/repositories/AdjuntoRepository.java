package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.Adjunto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdjuntoRepository extends JpaRepository<Adjunto, Long> {
    
}