package com.tecazuay.example.restapi.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.fasterxml.jackson.annotation.JsonIgnore;

@MappedSuperclass
@Inheritance(strategy = InheritanceType.JOINED)
public class Globals {

	@Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP", nullable = false)
	private LocalDateTime createdAt = LocalDateTime.now();

	@Column(name = "updated_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP", nullable = false)
	private LocalDateTime updatedAt = LocalDateTime.now();

	@Column(name = "created_by", nullable = true)
	private Long createdBy;

	@Column(name = "updated_by", nullable = true)
	private Long updatedBy;

	@Column(name = "is_deleted", columnDefinition = "BOOLEAN DEFAULT  'false' ")
	private boolean isDeleted;

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Long getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Long createdBy) {
		this.createdBy = createdBy;
	}

	public Long getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Long updatedBy) {
		this.updatedBy = updatedBy;
	}

	@JsonIgnore
	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	@PrePersist
	public void logAddUserCreate() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Object auth = authentication.getPrincipal();
		if (auth instanceof Usuario) {
			setCreatedBy(((Usuario) auth).getPersonaId());
		}
	}

	@PreUpdate
	public void logAddUserUpdate() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Object auth = authentication.getPrincipal();
		if (auth instanceof Usuario) {
			setUpdatedBy(((Usuario) auth).getPersonaId());
		}
		setUpdatedAt(LocalDateTime.now());
	}

}
