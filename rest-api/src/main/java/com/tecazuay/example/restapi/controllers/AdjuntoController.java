package com.tecazuay.example.restapi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.tecazuay.example.restapi.models.Adjunto;
import com.tecazuay.example.restapi.repositories.AdjuntoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping("/adjunto")
public class AdjuntoController {

    @Autowired
    private AdjuntoRepository adjuntoRepository;

    public List<Adjunto> getAdjuntos() {
        return adjuntoRepository.findAll();
    }

	@RequestMapping(value = "/crear", method = RequestMethod.POST)
	@ResponseBody
	@CrossOrigin
	public Adjunto createAdjunto(@RequestBody Adjunto ad) {
		return adjuntoRepository.save(ad);
	}

	@RequestMapping(value = "/{adjunto_id}", method = RequestMethod.DELETE)
	@ResponseBody
	@CrossOrigin
	public void deleteAdjunto(@PathVariable Long adjunto_id) {
		adjuntoRepository.deleteById(adjunto_id);
	}

    @RequestMapping(value = "{adjunto_id}", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public Adjunto updateAdjunto(@PathVariable Long adjunto_id) {
            return adjuntoRepository.findById(adjunto_id).get();
    }
}