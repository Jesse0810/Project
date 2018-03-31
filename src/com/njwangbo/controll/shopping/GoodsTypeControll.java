package com.njwangbo.controll.shopping;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.common.GridJson;
import com.njwangbo.pojo.common.ResJson;
import com.njwangbo.pojo.shopping.GoodsType;
import com.njwangbo.service.shopping.GoodsTypeService;



@Controller
public class GoodsTypeControll {
	@Autowired
	private GoodsTypeService goodsTypeService;
	@Resource
	private HttpServletRequest request;
	
	/**
	 * 按id查询单个商品类型信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryGoodsTypeById")
	@ResponseBody
	public GoodsType queryGoodsTypeById(GoodsType goodsType)
			throws ServletException, IOException {

		GoodsType g = goodsTypeService.queryGoodsTypeById(goodsType);
		return g;
	}
	/**
	 * 分页查询GoodsType表数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryGoodsTypeForGrid")
	@ResponseBody
	public GridJson queryGoodsTypeForGrid(GridCondition condition)
			throws ServletException, IOException {

		GridJson json =  new GridJson();
		
		List<GoodsType> goodsTypeList = goodsTypeService.queryGoodsTypeForGrid(condition);
		
		int total = goodsTypeService.queryGoodsTypeCount(condition);
		
		json.setRows(goodsTypeList);
		
		json.setTotal(total);
		
		return json;		
	}
	/**
	 * 查询GoodsType表所有数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryGoodsTypeAll")
	@ResponseBody
	public List<GoodsType> queryGoodsTypeAll()
			throws ServletException, IOException {
		
		List<GoodsType> goodsTypeList = goodsTypeService.queryGoodsTypeAll();			
		
		return goodsTypeList;		
	}
	/**
	 * 查询GoodsType表所有数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryGoodsTypeGroupByGoodsCount")
	@ResponseBody
	public List<GoodsType> queryGoodsTypeGroupByGoodsCount()
			throws ServletException, IOException {
		
		List<GoodsType> goodsTypeList = goodsTypeService.queryGoodsTypeGroupByGoodsCount();			
		
		return goodsTypeList;		
	}
	/**
	 * 添加商品类型信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/insertGoodsType")
	@ResponseBody
	public ResJson insertGoodsType(GoodsType goodsType)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		
		GoodsType g = goodsTypeService.queryGoodsTypeByName(goodsType);
		if (g != null) {
			json.setIsSuccess("false");
    		json.setMsg("商品类型名已经注册过");
		} else {
			int result = goodsTypeService.insertGoodsType(goodsType);
			if (result > 0) {
				json.setIsSuccess("true");
        		json.setMsg("商品类型注册成功");
			} else {
				json.setIsSuccess("false");
        		json.setMsg("系统出现错误");
			}
		}
		
    	return json;
	}
	/**
	 * 修改更新商品类型信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/updateGoodsType")
	@ResponseBody
	public ResJson updateGoodsType(GoodsType goodsType) throws ServletException,
			IOException {
		ResJson json =  new ResJson();
		
		GoodsType g = goodsTypeService.queryGoodsTypeByName(goodsType);
		if (g != null && g.getId() != goodsType.getId()) {
			json.setIsSuccess("false");
    		json.setMsg("商品类型名已经存在，请修改其他商品名");
		} else {
			int result = goodsTypeService.updateGoodsType(goodsType);
			if (result > 0) {
				json.setIsSuccess("true");
	    		json.setMsg("商品类型信息修改成功");
			} else {
				json.setIsSuccess("false");
	    		json.setMsg("商品类型信息修改失败");
			}
		}
		return json;
	}
	/**
	 * 按id删除商品类型信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/deleteGoodsType")
	@ResponseBody
	public ResJson deleteGoodsType(GoodsType goodsType) throws ServletException, IOException {
		ResJson json =  new ResJson();
		
		int count = goodsTypeService.deleteGoodsTypeById(goodsType,request.getServletContext().getRealPath("/"));
		if (count > 0) {
			json.setIsSuccess("true");
    		json.setMsg("商品类型信息删除成功");
		} else {
			json.setIsSuccess("true");
    		json.setMsg("商品类型信息删除失败");
		}

		return json;
	}
}
