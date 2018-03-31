package com.njwangbo.pojo.shopping;

public class ReviewImg {
	private String id;
	private String name;
	private String reviewId;
	
	public ReviewImg() {
		super();
	}

	public ReviewImg(String id, String name, String reviewId) {
		super();
		this.id = id;
		this.name = name;
		this.reviewId = reviewId;
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

	public String getReviewId() {
		return reviewId;
	}

	public void setReviewId(String reviewId) {
		this.reviewId = reviewId;
	}
	
	
}
