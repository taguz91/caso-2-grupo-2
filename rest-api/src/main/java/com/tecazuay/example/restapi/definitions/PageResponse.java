package com.tecazuay.example.restapi.definitions;

import java.util.List;

import org.springframework.data.domain.Page;

public class PageResponse {

	private List<?> data;
	private PageMetada meta;

	public PageResponse(Page<?> page) {
		this.data = page.getContent();
		this.meta = new PageMetada(page.getNumber(), page.getTotalElements(), page.getTotalPages());
	}

	public List<?> getData() {
		return data;
	}

	public void setData(List<?> data) {
		this.data = data;
	}

	public PageMetada getMeta() {
		return meta;
	}

	public void setMeta(PageMetada meta) {
		this.meta = meta;
	}

}
