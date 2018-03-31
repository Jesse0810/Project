package com.njwangbo.mapper.shopping;

import com.njwangbo.pojo.shopping.GoodsImg;

public interface GoodsImgMapper {
	
	public int addGoodsImg(GoodsImg goodsImg);

	public int delGoodsImg(GoodsImg goodsImg);
	/**
	 * 根据商品id删除商品图片
	 * @param goodsImg
	 * @return
	 */
	public int deleteImgByGoodsId(GoodsImg goodsImg);
	
	
	/**
	 * 根据商品id修改商品图片
	 * @param goodsImg
	 * @return
	 */
	public int updateGoodsImg(GoodsImg goodsImg);
	
	/**
	 * 根据商品id和图片名称查找图片
	 * @param goodsImg
	 * @return
	 */
	public GoodsImg queryImgByNameAndGoodsId(GoodsImg goodsImg);
}
