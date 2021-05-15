package com.tecazuay.example.restapi.api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class AmazonConfig {

	@Bean
	public AmazonS3 s3() {
		return AmazonS3ClientBuilder
				.standard()
				.withRegion("us-east-1")
				.build();
	}
	
}
