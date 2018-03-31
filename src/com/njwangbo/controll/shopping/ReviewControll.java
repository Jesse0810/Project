package com.njwangbo.controll.shopping;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.common.GridJson;
import com.njwangbo.pojo.common.ResJson;
import com.njwangbo.pojo.shopping.Review;
import com.njwangbo.service.shopping.ReviewService;

@Controller
public class ReviewControll {
	@Autowired
	private ReviewService reviewService;
	@Resource
	private HttpServletRequest request;
	
	
	/**
	 * 按id查询单个商品评论信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryReviewById")
	@ResponseBody
	public Review queryReviewById(Review review)
			throws ServletException, IOException {

		Review r = reviewService.queryReviewById(review);
		return r;
	}
	/**
	 * 按商品id和用户id查询商品评论信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryReviewByUserAndGoods")
	@ResponseBody
	public Review queryReviewByUserAndGoods(Review review)
			throws ServletException, IOException {
		GridCondition condition = new GridCondition();
		
		condition.setCondition(" WHERE U.ID ='"+review.getUserId()+
		"' AND G.ID = '"+review.getGoodsId()+"' ");
		
		List<Review> reviewList = reviewService.queryReviewByCondition(condition);
		
		Review r = reviewList.size()>0?reviewList.get(0):null;
		
		return r;
	}
	/**
	 * 分页查询Review表数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryReviewForGrid")
	@ResponseBody
	public GridJson queryReviewForGrid(GridCondition condition)
			throws ServletException, IOException {

		GridJson json =  new GridJson();
		
		List<Review> goodsList = reviewService.queryReviewForGridByCondition(condition);
		
		int total = reviewService.queryReviewCount(condition);
		
		json.setRows(goodsList);
		
		json.setTotal(total);
		String oldCondition = condition.getCondition();
		
		condition.setCondition(oldCondition+" AND R.STAR BETWEEN '4' AND '5' ");		
		int niceNum = reviewService.queryReviewCount(condition);
		json.setNiceNum(niceNum);
		condition.setCondition(oldCondition+" AND R.STAR BETWEEN '2' AND '3' ");		
		int normalNum = reviewService.queryReviewCount(condition);
		json.setNormalNum(normalNum);
		condition.setCondition(oldCondition+" AND R.STAR = '1' ");		
		int negativeNum = reviewService.queryReviewCount(condition);
		json.setNegativeNum(negativeNum);
		
		return json;		
	}
	/**
	 * 添加商品评论
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/insertReview")
	@ResponseBody
	public ResJson insertReview(Review review ,@RequestParam("fileImgName[]") String[] fileImgName)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		int result = reviewService.insertReview(review, fileImgName, request.getServletContext().getRealPath("/"));
		if (result > 0) {
			json.setIsSuccess("true");
			json.setMsg("商品评论成功!");
		} else {
			json.setIsSuccess("false");
			json.setMsg("商品评论失败!");
		}

		return json;
	}
	/**
	 * 按id删除商品评论
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/deleteReview")
	@ResponseBody
	public ResJson deleteReview(Review review) throws ServletException, IOException {
		ResJson json =  new ResJson();
		
		int count = reviewService.deleteReview(review, request.getServletContext().getRealPath("/"));
		if (count > 0) {
			json.setIsSuccess("true");
    		json.setMsg("商品评论删除成功");
		} else {
			json.setIsSuccess("true");
    		json.setMsg("商品评论删除失败");
		}

		return json;
	}
	/**
	 * 修改商品评论
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/updateReview")
	@ResponseBody
	public ResJson updateReview(Review review ,@RequestParam("fileImgName[]") String[] fileImgName)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		int result = reviewService.updateReview(review, fileImgName, request.getServletContext().getRealPath("/"));
		if (result > 0) {
			json.setIsSuccess("true");
			json.setMsg("商品评论修改成功");
		} else {
			json.setIsSuccess("false");
			json.setMsg("商品评论修改失败");
		}

		return json;
	}
}
