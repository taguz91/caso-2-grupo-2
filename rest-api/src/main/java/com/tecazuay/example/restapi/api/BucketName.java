package com.tecazuay.example.restapi.api;

public enum BucketName {

	TIR_IMAGE("tir-anexos");

	BucketName(String string) {
		this.bucketName = string;
	}

	private final String bucketName;

	public String getBucketName() {
		return bucketName;
	}

}
