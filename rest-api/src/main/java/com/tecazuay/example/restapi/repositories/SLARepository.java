package com.tecazuay.example.restapi.repositories;

import com.tecazuay.example.restapi.models.SLA;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SLARepository extends JpaRepository<SLA, Long> {
   
    @Query("select s from sla s where s.id = :sla_id")
    List<SLA> getSla_id(Long sla_id);
}