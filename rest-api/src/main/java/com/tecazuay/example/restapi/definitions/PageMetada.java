package com.tecazuay.example.restapi.definitions;

public class PageMetada {

	private int current;
	private long items;
	private int pages;
	private int perPage;

	public PageMetada(int current, long items, int pages, int perPage) {
		this.current = current;
		this.items = items;
		this.pages = pages;
		this.perPage = perPage;
	}

	public int getCurrent() {
		return current;
	}

	public void setCurrent(int current) {
		this.current = current;
	}

	public long getItems() {
		return items;
	}

	public void setItems(long items) {
		this.items = items;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public int getPerPage() {
		return perPage;
	}

	public void setPerPage(int perPage) {
		this.perPage = perPage;
	}
}
