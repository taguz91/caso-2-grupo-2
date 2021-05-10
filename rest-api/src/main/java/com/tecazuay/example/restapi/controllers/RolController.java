package com.tecazuay.example.restapi.controllers;

import java.util.List;
import com.tecazuay.example.restapi.models.Rol;
import com.tecazuay.example.restapi.services.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/rol")
public class RolController {
    
    @Autowired
    private RolService rolService;

    @GetMapping(value = "/")
    public ResponseEntity<List<Rol>> readAllRols() {
        return ResponseEntity.status(HttpStatus.OK).body(this.rolService.findAll());
    }

    @GetMapping(value = "/id")
    public ResponseEntity<Rol> readRolById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.rolService.findById(id));
    }
}