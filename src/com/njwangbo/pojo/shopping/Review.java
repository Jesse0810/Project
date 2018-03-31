package com.njwangbo.pojo.shopping;

import java.util.List;

public class Review {
	
	private String id;
	private String userId;
	private String userName;
	private int userLvl;
	private String userImg;
	private String goodsId;
	private String goodsName;
	private int star;
	private String con;
	private int nicenum;
	private int commentnum;
	private String createDate;
	private List<ReviewImg> imgList;
	public Review() {
		super();
	}
	public Review(String id, String userId, String userName, int userLvl,
			String userImg, String goodsId, String goodsName, int star,
			String con, int nicenum, int commentnum, String createDate,
			List<ReviewImg> imgList) {
		super();
		this.id = id;
		this.userId = userId;
		this.userName = userName;
		this.userLvl = userLvl;
		this.userImg = userImg;
		this.goodsId = goodsId;
		this.goodsName = goodsName;
		this.star = star;
		this.con = con;
		this.nicenum = nicenum;
		this.commentnum = commentnum;
		this.createDate = createDate;
		this.imgList = imgList;
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
	public int getUserLvl() {
		return userLvl;
	}
	public void setUserLvl(int userLvl) {
		this.userLvl = userLvl;
	}
	public String getUserImg() {
		return userImg;
	}
	public void setUserImg(String userImg) {
		this.userImg = userImg;
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
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public String getCon() {
		return con;
	}
	public void setCon(String con) {
		this.con = con;
	}
	public int getNicenum() {
		return nicenum;
	}
	public void setNicenum(int nicenum) {
		this.nicenum = nicenum;
	}
	public int getCommentnum() {
		return commentnum;
	}
	public void setCommentnum(int commentnum) {
		this.commentnum = commentnum;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public List<ReviewImg> getImgList() {
		return imgList;
	}
	public void setImgList(List<ReviewImg> imgList) {
		this.imgList = imgList;
	}
	
	
	
}
