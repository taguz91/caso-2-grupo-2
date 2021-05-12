package com.tecazuay.example.restapi.repositories;

import java.util.List;

import com.tecazuay.example.restapi.models.SLA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SLARepository extends JpaRepository<SLA, Long> {
   
    @Query("select s from sla a where s.SLA.id = :sla_id")
    List<ReservarAlojamiento> getSla_id(Long sla_id);
}