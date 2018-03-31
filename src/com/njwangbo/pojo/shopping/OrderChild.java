package com.njwangbo.pojo.shopping;

import java.util.List;

public class OrderChild {
	private String id;
	private String cartId;
	private double price;
	private String orderId;
	private String userName;
	private String userId;
	private String goodsId;
	private String goodsName;
	private List<GoodsImg> imgList;
	private int num;
	public OrderChild() {
		super();
	}
	public OrderChild(String id, String cartId, double price, String orderId, String userName, String userId,
			String goodsId, String goodsName, List<GoodsImg> imgList, int num) {
		super();
		this.id = id;
		this.cartId = cartId;
		this.price = price;
		this.orderId = orderId;
		this.userName = userName;
		this.userId = userId;
		this.goodsId = goodsId;
		this.goodsName = goodsName;
		this.imgList = imgList;
		this.num = num;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCartId() {
		return cartId;
	}
	public void setCartId(String cartId) {
		this.cartId = cartId;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getGoodsId() {
		return goodsId;
	}
	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}
	public String getGoodsName() {
		return goodsName;
	}
	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}
	public List<GoodsImg> getImgList() {
		return imgList;
	}
	public void setImgList(List<GoodsImg> imgList) {
		this.imgList = imgList;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	
	
}
