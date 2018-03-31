package com.njwangbo.pojo.common;

public class ResJson {
	private String isSuccess;
	private String msg;	
	public ResJson() {
		super();
	}
	public ResJson(String isSuccess, String msg) {
		super();
		this.isSuccess = isSuccess;
		this.msg = msg;
	}
	public String getIsSuccess() {
		return isSuccess;
	}
	public void setIsSuccess(String isSuccess) {
		this.isSuccess = isSuccess;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	
}
