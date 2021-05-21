package com.tecazuay.example.restapi.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.definitions.MessageResponse;
import com.tecazuay.example.restapi.models.Adjunto;
import com.tecazuay.example.restapi.repositories.AdjuntoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping("/api/v1/adjunto")
public class AdjuntoController {

	@Autowired
	private AdjuntoRepository adjuntoRepository;

	@RequestMapping(value = "/delete/{adjunto_id}", method = RequestMethod.DELETE)
	@ResponseBody
	@CrossOrigin
	public ResponseEntity<MessageResponse> deleteAdjunto(@PathVariable Long adjunto_id) {
		int adjunto = adjuntoRepository.softDeleteById(adjunto_id);
		if (adjunto == 0) {
			throw new ResourceNotFoundException("No pudimos eliminar el adjunto.");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(new MessageResponse("Borramos " + adjunto));
	}

	@RequestMapping(value = "{adjunto_id}", method = RequestMethod.GET)
	@ResponseBody
	@CrossOrigin
	public Adjunto updateAdjunto(@PathVariable Long adjunto_id) {
		return adjuntoRepository.findById(adjunto_id).get();
	}
}