package com.njwangbo.pojo.shopping;

import java.util.List;

public class Goods {
	private String id;
	private String name;
	private double price;
	private String createDate;
	private String title;
	private String description;
	private String producer;
	private String slideImage;
	private int comments;
	private int purchases;
	private int facomments;
	private int stock;
	private String typeId;
	private String typeName;
	private List<GoodsImg> imgList;
	
	public Goods() {
		super();
	}

	public Goods(String id, String name, double price, String createDate,
			String title, String description, String producer,
			String slideImage, int comments, int purchases, int facomments,
			int stock, String typeId, String typeName, List<GoodsImg> imgList) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.createDate = createDate;
		this.title = title;
		this.description = description;
		this.producer = producer;
		this.slideImage = slideImage;
		this.comments = comments;
		this.purchases = purchases;
		this.facomments = facomments;
		this.stock = stock;
		this.typeId = typeId;
		this.typeName = typeName;
		this.imgList = imgList;
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getProducer() {
		return producer;
	}

	public void setProducer(String producer) {
		this.producer = producer;
	}

	public String getSlideImage() {
		return slideImage;
	}

	public void setSlideImage(String slideImage) {
		this.slideImage = slideImage;
	}

	public int getComments() {
		return comments;
	}

	public void setComments(int comments) {
		this.comments = comments;
	}

	public int getPurchases() {
		return purchases;
	}

	public void setPurchases(int purchases) {
		this.purchases = purchases;
	}

	public int getFacomments() {
		return facomments;
	}

	public void setFacomments(int facomments) {
		this.facomments = facomments;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public List<GoodsImg> getImgList() {
		return imgList;
	}

	public void setImgList(List<GoodsImg> imgList) {
		this.imgList = imgList;
	}

	
	
	
	
}
