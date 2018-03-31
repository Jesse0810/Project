package com.njwangbo.exception;

/**
 * 自定义异常
 */
public class MyException extends Exception {
	private String message;

	public MyException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
