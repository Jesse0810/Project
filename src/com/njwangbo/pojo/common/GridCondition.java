package com.njwangbo.pojo.common;

public class GridCondition {
	private int pageSize;
	private int pageNum;
	private String condition;
	
	public GridCondition() {
		super();
	}
	
	

	public GridCondition(int pageSize, int pageNum, String condition) {
		super();
		this.pageSize = pageSize;
		this.pageNum = pageNum;
		this.condition = condition;
	}



	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}


	public String getCondition() {
		return condition;
	}


	public void setCondition(String condition) {
		this.condition = condition;
	}
	
	
}
