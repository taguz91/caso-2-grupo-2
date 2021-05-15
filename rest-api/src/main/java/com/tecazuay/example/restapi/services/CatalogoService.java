package com.tecazuay.example.restapi.services;

import java.util.List;
import com.tecazuay.example.restapi.models.Catalogo;

public interface CatalogoService {

    Catalogo findById(Long id);

    List<Catalogo> findAll();

    Catalogo save(Catalogo catalogo);

    Catalogo update(Catalogo id);

    Catalogo deleteById(Long id);

}
