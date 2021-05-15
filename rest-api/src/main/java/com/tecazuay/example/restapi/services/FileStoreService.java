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
import com.tecazuay.example.restapi.models.Adjunto;

@Service
public class FileStoreService {

	private final AmazonS3 amazonS3;

	@Autowired
	public FileStoreService(AmazonS3 amazonS3) {
		this.amazonS3 = amazonS3;
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

	public Adjunto saveAdjunto(MultipartFile file) {

		if (file.isEmpty()) {
			throw new IllegalStateException("No encontramos el archivo.");
		}

		Map<String, String> metadata = new HashMap<>();
		metadata.put("Content-Type", file.getContentType());
		metadata.put("Content-Length", String.valueOf(file.getSize()));

		String path = String.format("%s", BucketName.TIR_IMAGE.getBucketName());
		String fileName = String.format("%s", file.getOriginalFilename());

		String urlS3 = "";
		try {
			urlS3 = uploadToS3(path, fileName, Optional.of(metadata), file.getInputStream());
		} catch (IOException e) {
			throw new IllegalStateException("No pudimos subir el recurso");
		}

		Adjunto ad = new Adjunto();
		ad.setUrl(urlS3);
		return ad;
	}

}
