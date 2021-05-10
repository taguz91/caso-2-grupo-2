package com.tecazuay.example.restapi.controllers;

import com.tecazuay.example.restapi.models.Historial;
import com.tecazuay.example.restapi.repositories.HistorialRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping("/historial")
public class HistorialController {

    @Autowired
   HistorialRepository historialRepository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public List<Historial> listar() {
        return historialRepository.findAll();
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public Historial guardar(@RequestBody Historial p) {
        return historialRepository.save(p);
    }
    @RequestMapping(value = "/{historial_id}", method = RequestMethod.GET)
    @ResponseBody
    public Historial leer(@PathVariable Long historial_id) {
        return historialRepository.getOne(historial_id);
    }
    @RequestMapping(value = "/{historial_id}", method = RequestMethod.DELETE)
    @ResponseBody
    @CrossOrigin
    public void borrar(@PathVariable Long historial_id) {
        historialRepository.deleteById(historial_id);
    }
}
