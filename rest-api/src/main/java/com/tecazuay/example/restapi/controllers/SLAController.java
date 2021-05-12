package com.tecazuay.example.restapi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.tecazuay.example.restapi.models.SLA;
import com.tecazuay.example.restapi.repositories.SLARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping("/sla")
public class SLAController {

    @Autowired
    private SLARepository slaRepository;

    public List<SLA> getSlas() {
        return new slaRepository.findAll();
    }

	@RequestMapping(value = "/crear", method = RequestMethod.POST)
	@ResponseBody
	@CrossOrigin
	public Adjunto createSLA(@RequestBody SLA s) {
		return adjuntoRepositoryAdjuntoRepository.save(s);
	}

	@RequestMapping(value = "/{sla_id}", method = RequestMethod.DELETE)
	@ResponseBody
	@CrossOrigin
	public void deleteSLA(@PathVariable Long sla_id) {
		slaRepository.deleteById(sla_id);
	}

    @RequestMapping(value = "{sla_id}", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public void updateSLA(@PathVariable Long sla_id) {
            return new slaRepository.getSlas(sla_id);
    }
}