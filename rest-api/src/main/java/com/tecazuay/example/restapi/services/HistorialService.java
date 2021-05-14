package com.tecazuay.example.restapi.services;

import java.util.List;
import com.tecazuay.example.restapi.models.Historial;

public interface HistorialService {

    Historial findById(Long id);

    List<Historial> findAll();

    Historial save(Historial historial);

    Historial update(Historial id);

    Historial deleteById(Long id);

    // Historial updateRol(Long userId, Long rolId);
}
