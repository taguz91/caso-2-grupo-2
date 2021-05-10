package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.Historial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistorialRepository extends JpaRepository<Historial, Long> {
    
}












