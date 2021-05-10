package com.tecazuay.example.restapi.controllers;

import java.util.List;
import java.util.Optional;

import com.tecazuay.example.restapi.models.Categoria;
import com.tecazuay.example.restapi.repositories.CategoriaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categorias")
public class CategoriaController {
    
    @Autowired
    CategoriaRepository categoriaRepository;

    @GetMapping("/")
    public List<Categoria> getAll(){
        return categoriaRepository.findAll();
    }

    @GetMapping("/categorias/{id}")
    public Optional<Categoria> getCategoria(@PathVariable("id") Long categoria_id){
        return categoriaRepository.findById(categoria_id);
    }

    @PostMapping("/categorias")
    public Categoria saveCategoria(@RequestBody Categoria categoria){
        return categoriaRepository.save(categoria);
    }
    
    @PutMapping("/categorias/{id}")
    public Categoria updateCategoria(@PathVariable("id") Long categoria_id, @RequestBody Categoria newCategoria){
        return categoriaRepository.findById(categoria_id)
        .map(categoria -> {
            categoria.setNombre_categoria(newCategoria.getNombre_categoria());
            return categoriaRepository.save(newCategoria);
        })
        .orElseGet(() -> {
            newCategoria.setCategoria_id(categoria_id);
            return categoriaRepository.save(newCategoria);
        });
    }

    @DeleteMapping("/categorias/{id}")
    public void deleteCategoria(@PathVariable("id") Long categoria_id){
        categoriaRepository.deleteById(categoria_id);
    }
}
