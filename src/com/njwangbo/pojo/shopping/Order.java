package com.njwangbo.pojo.shopping;

import java.util.List;

public class Order {
	private String id;
	private int state;
	private String createDate;
	private String userId;
	private String userName;
	private List<OrderChild> childList;
	public Order() {
		super();
	}
	public Order(String id, int state, String createDate, String userId,
			String userName, List<OrderChild> childList) {
		super();
		this.id = id;
		this.state = state;
		this.createDate = createDate;
		this.userId = userId;
		this.userName = userName;
		this.childList = childList;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public List<OrderChild> getChildList() {
		return childList;
	}
	public void setChildList(List<OrderChild> childList) {
		this.childList = childList;
	}
	
}
