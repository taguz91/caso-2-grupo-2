package com.tecazuay.example.restapi.services;
import java.util.List;

import com.tecazuay.example.restapi.models.EncuestaSatisfacion;

public interface encuestasatisfaccionservice {
    
    List<EncuestaSatisfacion> findAll();
    EncuestaSatisfacion findById(Long id);
}
