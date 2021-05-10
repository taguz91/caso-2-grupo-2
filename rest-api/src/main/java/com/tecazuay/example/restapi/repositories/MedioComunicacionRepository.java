package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.MedioComunicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedioComunicacionRepository extends JpaRepository<MedioComunicacion, Long> {
    
}