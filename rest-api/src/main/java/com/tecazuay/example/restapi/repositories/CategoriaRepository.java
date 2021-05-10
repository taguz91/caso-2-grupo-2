package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.Categoria;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    
}
