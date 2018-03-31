package com.njwangbo.service.shopping.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.njwangbo.mapper.shopping.GoodsTypeMapper;
import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.shopping.Goods;
import com.njwangbo.pojo.shopping.GoodsType;
import com.njwangbo.service.shopping.GoodsService;
import com.njwangbo.service.shopping.GoodsTypeService;

@Service("goodsTypeService")
@Transactional
public class GoodsTypeServiceImpl implements GoodsTypeService{
	@Autowired
	private GoodsTypeMapper goodsTypeMapper;
	@Autowired
	private GoodsService goodsService;
	@Override
	public int deleteGoodsTypeById(GoodsType goodsType, String tomcatPath) {
		int count = 0;
		
		Goods goods = new Goods();
		goods.setTypeId(goodsType.getId());
		
		goodsService.deleteGoodsByTypeID(goods, tomcatPath);
		
		count =	goodsTypeMapper.deleteGoodsTypeById(goodsType);
		return count;
	}

	@Override
	public List<GoodsType> queryGoodsTypeAll() {
		
		return goodsTypeMapper.queryGoodsTypeAll();
	}

	@Override
	public List<GoodsType> queryGoodsTypeForGrid(GridCondition condition) {
		
		return goodsTypeMapper.queryGoodsTypeByCondition(condition);
	}

	@Override
	public int queryGoodsTypeCount(GridCondition condition) {
		
		return goodsTypeMapper.queryGoodsTypeCount(condition);
	}

	@Override
	public GoodsType queryGoodsTypeByName(GoodsType goodsType) {
		
		return goodsTypeMapper.queryGoodsTypeByName(goodsType);
	}

	@Override
	public GoodsType queryGoodsTypeById(GoodsType goodsType) {
		
		return goodsTypeMapper.queryGoodsTypeById(goodsType);
	}

	@Override
	public int insertGoodsType(GoodsType goodsType) {
		
		return goodsTypeMapper.insertGoodsType(goodsType);
	}

	@Override
	public int updateGoodsType(GoodsType goodsType) {
		
		return goodsTypeMapper.updateGoodsType(goodsType);
	}

	@Override
	public List<GoodsType> queryGoodsTypeGroupByGoodsCount() {
		
		return goodsTypeMapper.queryGoodsTypeGroupByGoodsCount();
	}

}
