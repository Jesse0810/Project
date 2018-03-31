package com.njwangbo.service.shopping;

import java.util.List;

import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.shopping.GoodsType;

public interface GoodsTypeService {
	public int deleteGoodsTypeById(GoodsType goodsType, String tomcatPath);
	
	public List<GoodsType> queryGoodsTypeAll();
	
	public List<GoodsType> queryGoodsTypeGroupByGoodsCount();
	
	public List<GoodsType> queryGoodsTypeForGrid(GridCondition condition);
	
	public int queryGoodsTypeCount(GridCondition condition);
	
	public GoodsType queryGoodsTypeByName(GoodsType goodsType);
	
	public GoodsType queryGoodsTypeById(GoodsType goodsType);
	
	public int insertGoodsType(GoodsType goodsType);
	
	public int updateGoodsType(GoodsType goodsType);
}
