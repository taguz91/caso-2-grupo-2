package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.MedioComunicacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedioComunicacionRepository extends JpaRepository<MedioComunicacion, Integer> {
    
}