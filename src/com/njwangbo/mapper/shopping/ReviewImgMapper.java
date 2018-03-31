package com.njwangbo.mapper.shopping;

import com.njwangbo.pojo.shopping.ReviewImg;

public interface ReviewImgMapper {
	
	public int addReviewImg(ReviewImg ReviewImg);

	public int delReviewImg(ReviewImg reviewImg);
	/**
	 * 根据商品id删除商品图片
	 * @param ReviewImg
	 * @return
	 */
	public int deleteImgByReviewId(ReviewImg reviewImg);
	
	
	/**
	 * 根据商品id修改商品图片
	 * @param ReviewImg
	 * @return
	 */
	public int updateReviewImg(ReviewImg reviewImg);
	
	/**
	 * 根据商品id查找图片
	 * @param ReviewImg
	 * @return
	 */
	public ReviewImg queryImgByReviewId(ReviewImg reviewImg);
}
