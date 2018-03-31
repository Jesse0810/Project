package com.njwangbo.service.shopping.impl;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.njwangbo.mapper.shopping.GoodsImgMapper;
import com.njwangbo.mapper.shopping.GoodsMapper;
import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.shopping.Goods;
import com.njwangbo.pojo.shopping.GoodsImg;
import com.njwangbo.service.shopping.GoodsService;
import com.njwangbo.util.shopping.TypeConverter;

@Service("goodsService")
@Transactional
public class GoodsServiceImpl implements GoodsService {
	@Autowired
	private GoodsMapper goodsMapper;
	@Autowired
	private GoodsImgMapper imgMapper;
	@Override
	public int insertGoods(Goods goods,String[] fileImgName, String tomcatPath) {
		// TODO Auto-generated method stub
		int count = 0;
		//添加商品
		count = goodsMapper.insertGoods(goods);
		
		String imgDir = "\\image\\goods\\"+goods.getId();
        System.out.println(imgDir);
      
        TypeConverter.createFile(imgDir,tomcatPath);
        TypeConverter.createFile(imgDir);
        
		for (int i = 0; i < fileImgName.length; i++) {
			try {
				String newFileImgName =TypeConverter.GenerateImage(fileImgName[i],imgDir, i,tomcatPath);
				GoodsImg img = new GoodsImg();
				img.setName(newFileImgName);
				img.setGoodsId(goods.getId());
				//添加商品图片
				imgMapper.addGoodsImg(img);
			} catch (Exception e) {
				
				e.printStackTrace();
			}
		}
		
		return count;
	}
	@Override
	public int deleteGoods(Goods goods, String tomcatPath) {
		int count = 0;
		//删除商品图片表
		GoodsImg goodsImg = new GoodsImg();
		goodsImg.setGoodsId(goods.getId());
		
		String imgDir = "\\image\\goods\\"+goods.getId();				
		
		TypeConverter.deleteDir(new File(TypeConverter.BasePath+imgDir));
		TypeConverter.deleteDir(new File(tomcatPath+imgDir));
		
		imgMapper.deleteImgByGoodsId(goodsImg);
		//删除商品表
		count = goodsMapper.deleteGoods(goods);
		
		
		return count;
	}
	@Override
	public int deleteGoodsByTypeID(Goods goods, String tomcatPath) {
		int count = 0;
		GridCondition condition = new GridCondition();
		condition.setCondition(" WHERE TYPEID = '"+goods.getTypeId()+"' ");
		
		List<Goods> goodsList = goodsMapper.queryGoodsByCondition(condition);
		
		String imgDir = "";
		for (Goods g : goodsList) {
			imgDir = "\\image\\goods\\"+g.getId();				
			GoodsImg goodsImg = new GoodsImg();
			goodsImg.setGoodsId(g.getId());
			
			TypeConverter.deleteDir(new File(TypeConverter.BasePath+imgDir));
			TypeConverter.deleteDir(new File(tomcatPath+imgDir));
			
			imgMapper.deleteImgByGoodsId(goodsImg);
		}
		
		count = goodsMapper.deleteGoodsByTypeID(goods);
		
		return count;
	}
	@Override
	public List<Goods> queryGoodsBySlideImage() {
		List<Goods> goodsList = null;
		GridCondition condition = new GridCondition();
		condition.setCondition(" WHERE SLIDEIMAGE is not null ");
		
		goodsList = goodsMapper.queryGoodsByCondition(condition);
		
		
		return goodsList;
	}
	@Override
	public Goods queryGoodsById(Goods goods) {
		
		return goodsMapper.queryGoodsById(goods);
	}
	@Override
	public int updateGoods(Goods goods,String[] fileImgName, String tomcatPath) {
		
		int count = 0;
		//添加商品
		count = goodsMapper.updateGoods(goods);
		GoodsImg imgdel = new GoodsImg();
		imgdel.setGoodsId(goods.getId());
		//根据商品id删除商品图片
		String imgDir = "\\image\\goods\\"+goods.getId();
        System.out.println(imgDir);
        for (int i = 0; i < fileImgName.length; i++) {
	        File uploadfile = new File(TypeConverter.BasePath+imgDir+"\\"+fileImgName[i]);
	    	if(uploadfile.exists()){
	    		fileImgName[i] = TypeConverter.GetImageStr(TypeConverter.BasePath+imgDir+"\\"+fileImgName[i]);
	    	}
        }
        TypeConverter.deleteDir(new File(TypeConverter.BasePath+imgDir));
		TypeConverter.deleteDir(new File(tomcatPath+imgDir));
        TypeConverter.createFile(imgDir,tomcatPath);
        TypeConverter.createFile(imgDir);
		imgMapper.deleteImgByGoodsId(imgdel);
//		String [] fileName = fileImgName.split(",");
		//创建商品图片
		for (int i = 0; i < fileImgName.length; i++) {
			try {
				String newFileName = TypeConverter.GenerateImage(fileImgName[i],imgDir, i,tomcatPath);
				GoodsImg goodsImg = new GoodsImg();
				goodsImg.setName(newFileName);
				goodsImg.setGoodsId(goods.getId());			
				imgMapper.addGoodsImg(goodsImg);
			} catch (Exception e) {
				
				e.printStackTrace();
			}			
		}		
		
		return count;
	}
	@Override
	public List<Goods> queryGoodsForGrid(GridCondition condition) {
		
		return goodsMapper.queryGoodsForGridByCondition(condition);
	}
	@Override
	public int queryGoodsCount(GridCondition condition) {
		
		return goodsMapper.queryGoodsCount(condition);
	}
	@Override
	public List<Goods> queryGoodsByPurchases(GridCondition condition) {
		
		
		return goodsMapper.queryGoodsByPurchases(condition);
	}
	@Override
	public Goods queryGoodsByName(Goods goods) {
		
		return goodsMapper.queryGoodsByName(goods);
	}
	@Override
	public int updateGoodsStock(Goods goods) {
		
		return goodsMapper.updateGoodsStock(goods);
	}
	@Override
	public int updateGoodsPurchases(Goods goods) {
		
		return goodsMapper.updateGoodsPurchases(goods);
	}
	
	
}
