package com.njwangbo.pojo.common;

import java.util.List;

public class GridJson {
	private int total;
	private int niceNum;
	private int normalNum;
	private int negativeNum;
	private List<?> rows;
	
	public GridJson() {
		super();
	}

	public GridJson(int total, int niceNum, int normalNum, int negativeNum,
			List<?> rows) {
		super();
		this.total = total;
		this.niceNum = niceNum;
		this.normalNum = normalNum;
		this.negativeNum = negativeNum;
		this.rows = rows;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getNiceNum() {
		return niceNum;
	}

	public void setNiceNum(int niceNum) {
		this.niceNum = niceNum;
	}

	public int getNormalNum() {
		return normalNum;
	}

	public void setNormalNum(int normalNum) {
		this.normalNum = normalNum;
	}

	public int getNegativeNum() {
		return negativeNum;
	}

	public void setNegativeNum(int negativeNum) {
		this.negativeNum = negativeNum;
	}

	public List<?> getRows() {
		return rows;
	}

	public void setRows(List<?> rows) {
		this.rows = rows;
	}
	
	
	
}
