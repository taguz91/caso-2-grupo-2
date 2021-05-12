package com.tecazuay.example.restapi.repositories;

import java.util.List;

import com.tecazuay.example.restapi.models.Servicio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    
    @Query(value = "SELECT nombre_servicio from servicio where categoria_id = :categoria_id", nativeQuery = true)
    List<Servicio> findByCategoriaId(Long categoria_id);
}
