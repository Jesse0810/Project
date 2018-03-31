package com.njwangbo.pojo.common;

public class User {
	private String id;
	private String name;
	private String pwd;
	private int lvl;
	private int sex;
	private String tel;
	private String image;
	private String createDate;
	private String code;
	
	public User() {
		super();
	}

	public User(String id, String name, String pwd) {
		super();
		this.id = id;
		this.name = name;
		this.pwd = pwd;
	}

	public User(String id) {
		super();
		this.id = id;
	}

	public User(String name, String pwd) {
		super();
		this.name = name;
		this.pwd = pwd;
	}
	
	public User(String id, String name, String pwd, int lvl, int sex, String tel,
			String image, String createDate, String code) {
		super();
		this.id = id;
		this.name = name;
		this.pwd = pwd;
		this.lvl = lvl;
		this.sex = sex;
		this.tel = tel;
		this.image = image;
		this.createDate = createDate;
		this.code = code;
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
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public int getLvl() {
		return lvl;
	}
	public void setLvl(int lvl) {
		this.lvl = lvl;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	
	
	
	
}
