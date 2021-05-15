package com.tecazuay.example.restapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender emailSender;

	@Override
	public void sendWelcome(String to) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("Bienvenido a Tirtec");
		message.setText("Bienvenido gracias por registrarte en nuestro sitio.");

		emailSender.send(message);
	}
}
