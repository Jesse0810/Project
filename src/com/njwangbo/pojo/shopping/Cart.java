package com.njwangbo.pojo.shopping;

import java.util.List;

public class Cart {
	private String id;
	private String userId;
	private String userName;
	private String goodsId;
	private String goodsName;
	private int goodsStock;
	private double goodsPrice;
	private int num;
	private int state;
	private int checked;
	private List<GoodsImg> imgList;
	private String createDate;
	public Cart() {
		super();
	}
	public Cart(String id, String userId, String userName, String goodsId,
			String goodsName, int goodsStock, double goodsPrice, int num,
			int state, int checked, List<GoodsImg> imgList, String createDate) {
		super();
		this.id = id;
		this.userId = userId;
		this.userName = userName;
		this.goodsId = goodsId;
		this.goodsName = goodsName;
		this.goodsStock = goodsStock;
		this.goodsPrice = goodsPrice;
		this.num = num;
		this.state = state;
		this.checked = checked;
		this.imgList = imgList;
		this.createDate = createDate;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public int getGoodsStock() {
		return goodsStock;
	}
	public void setGoodsStock(int goodsStock) {
		this.goodsStock = goodsStock;
	}
	public double getGoodsPrice() {
		return goodsPrice;
	}
	public void setGoodsPrice(double goodsPrice) {
		this.goodsPrice = goodsPrice;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public int getChecked() {
		return checked;
	}
	public void setChecked(int checked) {
		this.checked = checked;
	}
	public List<GoodsImg> getImgList() {
		return imgList;
	}
	public void setImgList(List<GoodsImg> imgList) {
		this.imgList = imgList;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	
}
