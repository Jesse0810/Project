package com.njwangbo.pojo.shopping;

public class GoodsImg {
	private String id;
	private String name;
	private String goodsId;
	private String basePath;
	
	public GoodsImg() {
		super();
	}

	public GoodsImg(String id, String name, String goodsId, String basePath) {
		super();
		this.id = id;
		this.name = name;
		this.goodsId = goodsId;
		this.basePath = basePath;
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

	public String getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	public String getBasePath() {
		return basePath;
	}

	public void setBasePath(String basePath) {
		this.basePath = basePath;
	}

	
}
