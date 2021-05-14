package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.EncuestaSatisfacion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface EncuestaRepository extends JpaRepository<EncuestaSatisfacion, Long>{
}
