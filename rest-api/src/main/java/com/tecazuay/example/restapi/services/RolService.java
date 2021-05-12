package com.tecazuay.example.restapi.services;

import java.util.List;
import com.tecazuay.example.restapi.models.Rol;

public interface RolService {
    
    List<Rol> findAll();
    Rol findById(Long id);
}
