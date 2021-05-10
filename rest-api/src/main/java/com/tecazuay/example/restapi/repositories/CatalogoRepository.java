package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.Catalogo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogoRepository extends JpaRepository<Catalogo, Long> {
    
}












