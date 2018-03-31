package com.njwangbo.pojo.shopping;


public class GoodsType {
	private String id;
	private String name;
	private int num;
	private String createDate;
	

	public GoodsType() {
		super();
	}


	public GoodsType(String id, String name, int num, String createDate) {
		super();
		this.id = id;
		this.name = name;
		this.num = num;
		this.createDate = createDate;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public int getNum() {
		return num;
	}


	public void setNum(int num) {
		this.num = num;
	}


	public String getCreateDate() {
		return createDate;
	}


	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	
	
}
