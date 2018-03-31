package com.njwangbo.pojo.shopping;

public class ModifyPassword {
	private String oldpassword;
	private String newpassword;
	private String code;
	
	public ModifyPassword() {
		super();
	}

	public ModifyPassword(String oldpassword, String newpassword, String code) {
		super();
		this.oldpassword = oldpassword;
		this.newpassword = newpassword;
		this.code = code;
	}

	public String getOldpassword() {
		return oldpassword;
	}

	public void setOldpassword(String oldpassword) {
		this.oldpassword = oldpassword;
	}

	public String getNewpassword() {
		return newpassword;
	}

	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
}
