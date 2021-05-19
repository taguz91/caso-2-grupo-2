package com.tecazuay.example.restapi.services;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.tecazuay.example.restapi.api.BucketName;
import com.tecazuay.example.restapi.api.exception.ResourceNotFoundException;
import com.tecazuay.example.restapi.api.params.AdjuntoParam;
import com.tecazuay.example.restapi.models.Adjunto;
import com.tecazuay.example.restapi.models.Historial;
import com.tecazuay.example.restapi.models.Ticket;
import com.tecazuay.example.restapi.repositories.AdjuntoRepository;
import com.tecazuay.example.restapi.repositories.HistorialRepository;
import com.tecazuay.example.restapi.repositories.TicketRepository;

@Service
public class FileStoreService {

	private final AmazonS3 amazonS3;
	private final TicketRepository ticketRepository;
	private final AdjuntoRepository adjuntoRepository;
	private HistorialRepository historialRepository;

	@Autowired
	public FileStoreService(AmazonS3 amazonS3, TicketRepository ticketRepository, AdjuntoRepository adjuntoRepository,
			HistorialRepository historialRepository) {
		this.amazonS3 = amazonS3;
		this.ticketRepository = ticketRepository;
		this.adjuntoRepository = adjuntoRepository;
		this.historialRepository = historialRepository;
	}

	private String uploadToS3(String path, String fileName, Optional<Map<String, String>> optionalMetada,
			InputStream inputStream) {
		ObjectMetadata objectMetadata = new ObjectMetadata();
		optionalMetada.ifPresent(map -> {
			if (!map.isEmpty()) {
				map.forEach(objectMetadata::addUserMetadata);
			}
		});
		try {
			amazonS3.putObject(new PutObjectRequest(path, fileName, inputStream, objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
			URL s3Url = amazonS3.getUrl(path, fileName);
			return s3Url.toExternalForm();
		} catch (AmazonServiceException e) {
			throw new IllegalStateException("Failed to upload a file. " + e.getMessage());
		}
	}

	public Adjunto saveAdjunto(AdjuntoParam adjunto) {
		MultipartFile file = adjunto.getFile();
		if (file.isEmpty()) {
			throw new IllegalStateException("No encontramos el archivo.");
		}

		Ticket ticket = ticketRepository.findById(adjunto.getTicketId())
				.orElseThrow(() -> new ResourceNotFoundException("Ticket no exist"));

		Map<String, String> metadata = new HashMap<>();
		metadata.put("Content-Type", file.getContentType());
		metadata.put("Content-Length", String.valueOf(file.getSize()));

		String path = String.format("%s", BucketName.TIR_IMAGE.getBucketName());
		String fileName = String.format("%s", file.getOriginalFilename());

		Historial historial = new Historial("Agregamos un archivo adjunto: " + fileName, ticket);
		String urlS3 = "";
		try {
			urlS3 = uploadToS3(path, fileName, Optional.of(metadata), file.getInputStream());
		} catch (IOException e) {
			throw new IllegalStateException("No pudimos subir el recurso");
		}

		Adjunto ad = new Adjunto();
		ad.setUrl(urlS3);
		ad.setTicket(ticket);
		this.historialRepository.save(historial);
		return adjuntoRepository.save(ad);
	}

}
