package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolRepository extends JpaRepository<Rol, Long> {
    
}
