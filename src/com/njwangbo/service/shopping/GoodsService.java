package com.njwangbo.service.shopping;

import java.util.List;

import com.njwangbo.pojo.shopping.Goods;
import com.njwangbo.pojo.common.GridCondition;

public interface GoodsService {
	
	public  Goods	queryGoodsById(Goods goods);
	
	public int insertGoods(Goods goods,String[] fileImgName, String tomcatPath);

	public int deleteGoods(Goods goods, String tomcatPath);
	
	public int deleteGoodsByTypeID(Goods goods, String tomcatPath);
	
	public int updateGoods(Goods goods,String[] fileImgName, String tomcatPath);
	
	public List<Goods> queryGoodsForGrid(GridCondition condition);

	public int queryGoodsCount(GridCondition condition);

	public List<Goods> queryGoodsByPurchases(GridCondition condition);
	
	public List<Goods> queryGoodsBySlideImage();

	public Goods queryGoodsByName(Goods goods);
	
	public int updateGoodsStock(Goods goods);

	public int updateGoodsPurchases(Goods goods);
}
