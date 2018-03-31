package com.njwangbo.controll.shopping;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.common.GridJson;
import com.njwangbo.pojo.common.ResJson;
import com.njwangbo.pojo.common.User;
import com.njwangbo.pojo.shopping.Cart;
import com.njwangbo.pojo.shopping.Goods;
import com.njwangbo.pojo.shopping.Order;
import com.njwangbo.pojo.shopping.OrderChild;
import com.njwangbo.service.shopping.CartService;
import com.njwangbo.service.shopping.GoodsService;
import com.njwangbo.service.shopping.OrderService;



@Controller
public class OrderControll {
	@Autowired
	private OrderService orderService;
	@Autowired
	private CartService cartService;
	@Autowired
	private GoodsService goodsService;
	@Resource
	private HttpServletRequest request;
	
	
	/**
	 * 按id查询单个订单信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryOrderById")
	@ResponseBody
	public Order queryOrderById(Order Order)
			throws ServletException, IOException {		
		Order o= orderService.queryOrderById(Order);
		return o;
	}
	/**
	 * 分页查询Order表数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryOrderForGrid")
	@ResponseBody
	public GridJson queryOrderForGrid(GridCondition condition)
			throws ServletException, IOException {

		GridJson json =  new GridJson();
		
		List<Order> orderList = orderService.queryOrderForGridByCondition(condition);	
		
		int total = orderService.queryOrderCount(condition);
		
		json.setRows(orderList);
		
		json.setTotal(total);
		
		return json;		
	}
	/**
	 * 提交订单信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/submitOrder")
	@ResponseBody
	public ResJson submitOrder()
			throws ServletException, IOException {
		ResJson json = new ResJson();
		int result = 0;
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if(user != null){
			GridCondition condition = new GridCondition();
			condition.setCondition(" WHERE U.ID ='"+user.getId()+"' AND C.STATE ='1' AND C.CHECKED = '1' ");
			List<Cart> cartsList = cartService.queryCartByCondition(condition);
			for (Cart cart : cartsList) {
				Goods goods  = new Goods();
				goods.setId(cart.getGoodsId());
				int newStock = cart.getGoodsStock() - cart.getNum();
				if(newStock < 0 ){
					json.setIsSuccess("false");
					json.setMsg("商品："+cart.getGoodsName()+",库存不足!");
					return json;
				}
				goods.setStock(newStock);
				result = goodsService.updateGoodsStock(goods);
			}		
			Order order = new Order();
			order.setUserId(user.getId());
			order.setState(1);
			result = orderService.insertOrder(order, cartsList);
			if (result > 0) {
				condition = new GridCondition();
        		condition.setCondition(" WHERE U.ID ='"+user.getId()+"' AND C.STATE ='1' ");
        		int cartNum = 0;
        		List<Cart> cList = cartService.queryCartByCondition(condition);
        		for (Iterator<Cart> iterator = cList.iterator(); iterator
						.hasNext();) {
					Cart itercart = iterator.next();
					cartNum+=itercart.getNum();
				}     		
        		session.setAttribute("cartNum", cartNum);
				Order o = orderService.queryOrderById(order);
				session.setAttribute("order", o);
				json.setIsSuccess("true");
				json.setMsg("订单提交成功!");
			} else {
				json.setIsSuccess("false");
				json.setMsg("订单提交失败!");
			}
		}else{
			json.setIsSuccess("false");
			json.setMsg("请重新登录!");
		}
		return json;
	}
	/**
	 * 删除订单信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/deleteOrder")
	@ResponseBody
	public ResJson deleteOrder(Order Order) throws ServletException, IOException {
		ResJson json =  new ResJson();
		
		int count = orderService.deleteOrder(Order);
		if (count > 0) {
			json.setIsSuccess("true");
    		json.setMsg("订单删除成功!");
		} else {
			json.setIsSuccess("true");
    		json.setMsg("订单删除失败!");
		}

		return json;
	}
	/**
	 * 更新订单状态
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/updateOrder")
	@ResponseBody
	public ResJson updateOrder(Order order)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		int result = 0;
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		Order sessionOrder = (Order) session.getAttribute("order");
		if(user != null){
			if(sessionOrder != null){
				sessionOrder.setState(order.getState());
				if(order.getState() == 0){
					List<OrderChild> childList = sessionOrder.getChildList();
					for (OrderChild child : childList) {
						Goods goods = new Goods();
						goods.setId(child.getGoodsId());
						Goods g =  goodsService.queryGoodsById(goods);
						int newPurchases = g.getPurchases()+child.getNum();
						g.setPurchases(newPurchases);
						result = goodsService.updateGoodsPurchases(g);
					}
				}
				result = orderService.updateOrder(sessionOrder);
				if (result > 0) {
					session.setAttribute("order", null);
					json.setIsSuccess("true");
					json.setMsg("订单更新成功!");
				} else {
					json.setIsSuccess("false");
					json.setMsg("订单更新失败!");
				}
			}else{
				json.setIsSuccess("false");
				json.setMsg("无订单编号，非法访问!");
			}
		}else{
			json.setIsSuccess("false");
			json.setMsg("请重新登录!");
		}
		return json;
	}
	/**
	 * 重新打开订单
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/reOpenOrder")
	@ResponseBody
	public ResJson reOpenOrder(Order order)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if (user != null) {
			Order o = orderService.queryOrderById(order);
			if (o != null) {
				session.setAttribute("order", o);
				json.setIsSuccess("true");
				json.setMsg("即将重新打开订单!");
			} else {
				json.setIsSuccess("false");
				json.setMsg("该条订单不存在!");
			}
		} else {
			json.setIsSuccess("false");
			json.setMsg("请重新登录!");
		}
		return json;
	}
	
	/**
	 * 关闭订单
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/closeOrder")
	@ResponseBody
	public ResJson closeOrder(Order order)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		int result = 0;
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if (user != null) {
			order.setState(2);
			result = orderService.updateOrder(order);
			if (result > 0) {
				session.setAttribute("order", null);
				json.setIsSuccess("true");
				json.setMsg("订单关闭成功!");
			} else {
				json.setIsSuccess("false");
				json.setMsg("订单关闭失败!");
			}
		} else {
			json.setIsSuccess("false");
			json.setMsg("请重新登录!");
		}
		return json;
	}
}
