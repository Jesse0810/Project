package com.njwangbo.mapper.shopping;

import java.util.List;

import com.njwangbo.pojo.shopping.Goods;
import com.njwangbo.pojo.common.GridCondition;

public interface GoodsMapper {
	
	public Goods queryGoodsById(Goods goods);
	
	public int insertGoods(Goods goods);

	public int deleteGoods(Goods goods);
	
	public int deleteGoodsByTypeID(Goods goods);
	
	public int updateGoods(Goods goods);
	
	public int updateGoodsPurchases(Goods goods);
	
	public int updateGoodsStock(Goods goods);
	
	public List<Goods> queryGoodsForGridByCondition(GridCondition condition);
	
	public List<Goods> queryGoodsByCondition(GridCondition condition);
	
	public int queryGoodsCount(GridCondition condition);
	
	public List<Goods> queryGoodsByPurchases(GridCondition condition);
	
	public Goods queryGoodsByName(Goods goods);
}
