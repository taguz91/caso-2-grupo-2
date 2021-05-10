package com.tecazuay.example.restapi.services.impl;

import java.util.List;
import java.util.Optional;

import com.tecazuay.example.restapi.models.Rol;
import com.tecazuay.example.restapi.repositories.RolRepository;
import com.tecazuay.example.restapi.services.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolServiceImpl implements RolService {
 
    @Autowired
    private RolRepository rolRepository;

    @Override
    public List<Rol> findAll() {
        return this.rolRepository.findAll();
    }

    @Override
    public Rol findById(Long id) {

        Optional<Rol> rOptinal = this.rolRepository.findById(id);

        if (rOptinal.isPresent()) {
            return rOptinal.get();
        } else {
            return null;
        }
    }
}
