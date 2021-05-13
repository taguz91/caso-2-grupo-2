package com.tecazuay.example.restapi.definitions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;

@SuppressWarnings("serial")
public class PageResponse {

	private List<?> data;
	private Map<String, Object> meta;

	public PageResponse(Page<?> page) {
		this.data = page.getContent();
		this.meta = new HashMap<String, Object>() {
			{
				put("current", page.getNumber());
				put("items", page.getTotalElements());
				put("pages", page.getTotalPages());
			}
		};
	}

	public List<?> getData() {
		return data;
	}

	public void setData(List<?> data) {
		this.data = data;
	}

	public Map<String, Object> getMeta() {
		return meta;
	}

	public void setMeta(Map<String, Object> meta) {
		this.meta = meta;
	}

}
