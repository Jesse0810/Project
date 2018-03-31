package com.njwangbo.controll.shopping;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.common.GridJson;
import com.njwangbo.pojo.common.ResJson;
import com.njwangbo.pojo.shopping.Goods;
import com.njwangbo.service.shopping.GoodsService;



@Controller
public class GoodsControll {
	@Autowired
	private GoodsService goodsService;
	@Resource
	private HttpServletRequest request;
	
	/**
	 * 按id查询单个商品信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryGoodsById")
	@ResponseBody
	public Goods queryGoodsById(Goods goods)
			throws ServletException, IOException {

		Goods g = goodsService.queryGoodsById(goods);
		return g;
	}
	/**
	 * 分页查询Goods表数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryGoodsForGrid")
	@ResponseBody
	public GridJson queryGoodsForGrid(GridCondition condition)
			throws ServletException, IOException {

		GridJson json =  new GridJson();
		
		List<Goods> goodsList = goodsService.queryGoodsForGrid(condition);
		
		int total = goodsService.queryGoodsCount(condition);
		
		json.setRows(goodsList);
		
		json.setTotal(total);
		
		return json;		
	}
	/**
	 * 按照购买量对商品进行排序，取出其中对应数量的前多少个商品信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryGoodsByPurchases")
	@ResponseBody
	public GridJson queryGoodsByPurchases(GridCondition condition)
			throws ServletException, IOException {

		GridJson json =  new GridJson();
		
		List<Goods> goodsList = goodsService.queryGoodsByPurchases(condition);
		
		json.setRows(goodsList);
		
		json.setTotal(goodsList.size());
		
		return json;		
	}
	/**
	 * 添加商品信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/insertGoods")
	@ResponseBody
	public ResJson insertGoods(Goods goods, @RequestParam("fileImgName[]") String[] fileImgName)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		Goods g = goodsService.queryGoodsByName(goods);
		if (g != null) {
			json.setIsSuccess("false");
    		json.setMsg("商品名已经注册过");
		} else {
			int result = goodsService.insertGoods(goods,fileImgName,request.getServletContext().getRealPath("/"));
			if (result > 0) {
				json.setIsSuccess("true");
        		json.setMsg("商品注册成功");
			} else {
				json.setIsSuccess("false");
        		json.setMsg("系统出现错误");
			}
		}
		
    	return json;
	}
	/**
	 * 更新商品信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/updateGoods")
	@ResponseBody
	public ResJson updateGoods(Goods goods, @RequestParam("fileImgName[]") String[] fileImgName)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		Goods g = goodsService.queryGoodsByName(goods);
		if (g != null&&!g.getName().equals(goods.getName())) {
			json.setIsSuccess("false");
    		json.setMsg("商品名已经存在，请修改其他商品名");
		} else {
			int result = goodsService.updateGoods(goods,fileImgName,request.getServletContext().getRealPath("/"));
			if (result > 0) {
				json.setIsSuccess("true");
        		json.setMsg("商品信息修改成功");
			} else {
				json.setIsSuccess("false");
        		json.setMsg("商品信息修改失败");
			}
		}
		
    	return json;
	}
	/**
	 * 查找轮播图片
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryGoodsBySlideImage")
	@ResponseBody
	public GridJson queryGoodsBySlideImage(GridCondition condition) throws ServletException,
			IOException {
		GridJson json =  new GridJson();
		
		List<Goods> goodsList = goodsService.queryGoodsBySlideImage();
		
		json.setRows(goodsList);
		
		json.setTotal(goodsList.size());
		
		return json;
	}
	/**
	 * 按id删除商品信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/deleteGoods")
	@ResponseBody
	public ResJson deleteGoods(Goods goods) throws ServletException, IOException {
		ResJson json =  new ResJson();
		
		int count = goodsService.deleteGoods(goods,request.getServletContext().getRealPath("/"));
		if (count > 0) {
			json.setIsSuccess("true");
    		json.setMsg("商品信息删除成功");
		} else {
			json.setIsSuccess("true");
    		json.setMsg("商品信息删除失败");
		}

		return json;
	}
	
	@RequestMapping("/upload")
	@ResponseBody
	public void upload(HttpServletRequest request,HttpServletResponse response) throws Exception {
		
		List<String> arrFileImgList = new ArrayList<String>();
		
		CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
		
		if(commonsMultipartResolver.isMultipart(request)){
			MultipartHttpServletRequest multirequest = (MultipartHttpServletRequest) request;
			Iterator<String> iterator = multirequest.getFileNames();
			int count = 0;
			while (iterator.hasNext()) {
				MultipartFile file =  multirequest.getFile(iterator.next().toString()) ;
				if (file != null) {
					String newFileName = System.currentTimeMillis()  + "_" + count++
							+ file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
					file.transferTo(new File(request.getServletContext().getRealPath("/")+"image/upload/goods/"+newFileName));
					arrFileImgList.add("image/upload/goods/"+newFileName);
				}
			}
		}
		
		String strFileName = Arrays.toString(arrFileImgList.toArray());
		PrintWriter pw = response.getWriter();
		//前端页面调用展示图片方法
		pw.print("<script>top.window.frames['frameDialog'].contentWindow.showImg('"+strFileName+"')</script>");
	}
}
