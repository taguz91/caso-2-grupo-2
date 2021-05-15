package com.tecazuay.example.restapi.api.params;

import javax.validation.constraints.NotNull;

import org.springframework.web.multipart.MultipartFile;

import com.tecazuay.example.restapi.validations.TicketExistConstrait;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AdjuntoParam {

	@NotNull
	@TicketExistConstrait
	private Long ticketId;

	@NotNull
	MultipartFile file;

	public AdjuntoParam(@NotNull Long ticketId, @NotNull MultipartFile file) {
		super();
		this.ticketId = ticketId;
		this.file = file;
	}

	public Long getTicketId() {
		return ticketId;
	}

	public void setTicketId(Long ticketId) {
		this.ticketId = ticketId;
	}

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}
}
