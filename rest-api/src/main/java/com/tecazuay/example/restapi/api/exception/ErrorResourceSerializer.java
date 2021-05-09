package com.tecazuay.example.restapi.api.exception;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class ErrorResourceSerializer extends JsonSerializer<ErrorResource> {

	@Override
	public void serialize(ErrorResource value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		Map<String, List<String>> json = new HashMap<>();
		gen.writeStartObject();
		gen.writeObjectFieldStart("errors");
		for (FieldErrorResource fieldErrorResource : value.getFieldErrors()) {
			if (!json.containsKey(fieldErrorResource.getField())) {
				json.put(fieldErrorResource.getField(), new ArrayList<String>());
			}
			json.get(fieldErrorResource.getField()).add(fieldErrorResource.getMessage());
		}
		for (Map.Entry<String, List<String>> pair : json.entrySet()) {
			gen.writeArrayFieldStart(pair.getKey());
			pair.getValue().forEach(content -> {
				try {
					gen.writeString(content);
				} catch (IOException e) {
					e.printStackTrace();
				}
			});
			gen.writeEndArray();
		}
		gen.writeEndObject();
		gen.writeEndObject();

	}

}
