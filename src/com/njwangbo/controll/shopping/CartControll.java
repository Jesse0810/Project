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
import com.njwangbo.service.shopping.CartService;


@Controller
public class CartControll {
	@Autowired
	private CartService cartService;
	@Resource
	private HttpServletRequest request;
	
	
	/**
	 * 按id查询单个购物车信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryCartById")
	@ResponseBody
	public Cart queryCartById(Cart cart)
			throws ServletException, IOException {

		Cart c= cartService.queryCartById(cart);
		return c;
	}
	/**
	 * 分页查询Cart表数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryCartForGrid")
	@ResponseBody
	public GridJson queryCartForGrid(GridCondition condition)
			throws ServletException, IOException {

		GridJson json =  new GridJson();
		
		List<Cart> goodsList = cartService.queryCartForGridByCondition(condition);
		
		int total = cartService.queryCartCount(condition);
		
		json.setRows(goodsList);
		
		json.setTotal(total);
		
		
		return json;		
	}
	/**
	 * 添加购物车信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/insertCart")
	@ResponseBody
	public ResJson insertCart(Cart cart)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		int result = cartService.insertCart(cart);
		if (result > 0) {
			json.setIsSuccess("true");
			json.setMsg("购物车添加成功!");
		} else {
			json.setIsSuccess("false");
			json.setMsg("购物车添加失败!");
		}

		return json;
	}
	/**
	 * 按id删除购物车数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/deleteCart")
	@ResponseBody
	public ResJson deleteCart(Cart cart) throws ServletException, IOException {
		ResJson json =  new ResJson();
		
		int count = cartService.deleteCart(cart);
		if (count > 0) {
			json.setIsSuccess("true");
    		json.setMsg("购物车删除成功");
		} else {
			json.setIsSuccess("true");
    		json.setMsg("购物车删除失败");
		}

		return json;
	}
	/**
	 * 根据id修改购物车
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/updateCart")
	@ResponseBody
	public ResJson updateCart(Cart cart )
			throws ServletException, IOException {
		ResJson json = new ResJson();
		int result = cartService.updateCart(cart);
		if (result > 0) {
			json.setIsSuccess("true");
			json.setMsg("购物车修改成功");
		} else {
			json.setIsSuccess("false");
			json.setMsg("购物车修改失败");
		}

		return json;
	}
	/**
	 * 提交购物车
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/addCart")
	@ResponseBody
	public ResJson addCart(Cart cart )
			throws ServletException, IOException {
		ResJson json = new ResJson();
		int result = 0;
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if(user != null){
			GridCondition condition = new GridCondition();
			condition.setCondition(" WHERE  G.ID = '"+cart.getGoodsId()+
			"' AND  U.ID = '"+user.getId()+"' AND C.STATE = '1' ");
			List<Cart> cList = cartService.queryCartByCondition(condition);
			Cart c = cList.size()>0?cList.get(0):null;
			if(c!=null){
				int newNum = c.getNum()+1;
				if(newNum>c.getGoodsStock()){
					json.setIsSuccess("false");
					json.setMsg("库存已经满了");
					return json;
				}
				c.setChecked(1);
				c.setNum(newNum);
				result = cartService.updateCartNum(c);
			}else{
				cart.setUserId(user.getId());
				cart.setNum(1);
				result = cartService.insertCart(cart);
			}
    		condition.setCondition(" WHERE U.ID ='"+user.getId()+"' AND C.STATE ='1' ");
    		int cartNum = 0;
    		List<Cart> cartsList = cartService.queryCartByCondition(condition);
    		for (Iterator<Cart> iterator = cartsList.iterator(); iterator
					.hasNext();) {
				Cart itercart = iterator.next();
				cartNum+=itercart.getNum();
			} 
    		session.setAttribute("cartNum", cartNum);
			if (result > 0) {
				json.setIsSuccess("true");
				json.setMsg("商品成功加入购物车!");
			} else {
				json.setIsSuccess("false");
				json.setMsg("商品加入购物车失败!");
			}
		}else{
			json.setIsSuccess("false");
			json.setMsg("请重新登录!");
		}

		return json;
	}
	/**
	 * 勾选购物车
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/checkCart")
	@ResponseBody
	public ResJson checkCart(Cart cart )
			throws ServletException, IOException {
		ResJson json = new ResJson();
		int result = 0;
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if(user != null){
			Cart c = cartService.queryCartById(cart);
			if(c!=null){
				c.setChecked(1);			
				result = cartService.updateCartNum(c);
				if (result > 0) {
					json.setIsSuccess("true");
					json.setMsg("该商品成功选中!");
				} else {
					json.setIsSuccess("false");
					json.setMsg("该商品选中失败!");
				}
			}else{
				json.setIsSuccess("false");
				json.setMsg("该条购物车数据不存在!");
			}
		}else{
			json.setIsSuccess("false");
			json.setMsg("请重新登录!");
		}

		return json;
	}
	/**
	 * 取消勾选购物车
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/checkOffCart")
	@ResponseBody
	public ResJson checkOffCart(Cart cart )
			throws ServletException, IOException {
		ResJson json = new ResJson();
		int result = 0;
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if(user != null){
			Cart c = cartService.queryCartById(cart);
			if(c!=null){
				c.setChecked(0);			
				result = cartService.updateCartNum(c);
				if (result > 0) {
					json.setIsSuccess("true");
					json.setMsg("该商品成功取消选中!");
				} else {
					json.setIsSuccess("false");
					json.setMsg("该商品取消选中失败!");
				}
			}else{
				json.setIsSuccess("false");
				json.setMsg("该条购物车数据不存在!");
			}		
		}else{
			json.setIsSuccess("false");
			json.setMsg("请重新登录!");
		}

		return json;
	}
	/**
	 * 用户查询购物车
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryCartByUser")
	@ResponseBody
	public GridJson queryCartByUser()
			throws ServletException, IOException {
		GridJson json = new GridJson();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		GridCondition condition = new GridCondition();
		condition.setCondition(" WHERE U.ID ='"+user.getId()+"' AND C.STATE ='1' ");
		List<Cart> cartsList = cartService.queryCartByCondition(condition);
		json.setRows(cartsList);
		int total = cartService.queryCartCount(condition);
		json.setTotal(total);
		return json;
	}
	/**
	 * 更新购物车商品购买数量
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/updateCartNum")
	@ResponseBody
	public ResJson updateCartNum(Cart cart)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if(user != null){
			Cart c = cartService.queryCartById(cart);
			if(c!=null){
				if(cart.getNum()>c.getGoodsStock()){
					json.setIsSuccess("false");
					json.setMsg("库存已经满了");
					return json;
				}
				c.setNum(cart.getNum());
				int count = cartService.updateCartNum(c);
				if (count > 0) {
					GridCondition condition = new GridCondition();
	        		condition.setCondition(" WHERE U.ID ='"+user.getId()+"' AND C.STATE ='1' ");
	        		int cartNum = 0;
	        		List<Cart> cartsList = cartService.queryCartByCondition(condition);
	        		for (Iterator<Cart> iterator = cartsList.iterator(); iterator
							.hasNext();) {
						Cart itercart = iterator.next();
						cartNum+=itercart.getNum();
					}     		
	        		session.setAttribute("cartNum", cartNum);
					json.setIsSuccess("true");
					json.setMsg("商品数量修改成功!");
				} else {
					json.setIsSuccess("false");
					json.setMsg("商品数量修改失败!");
				}
			}else{
				json.setIsSuccess("false");
				json.setMsg("该条购物车数据不存在!");
			}		
		}else{
			json.setIsSuccess("false");
			json.setMsg("请重新登录!");
		}
		
		return json;
	}
	/**
	 * 用户删除购物车中的商品
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/deleteCartByUser")
	@ResponseBody
	public ResJson deleteCartByUser(Cart cart)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if(user != null){
			Cart c = cartService.queryCartById(cart);
			if(c!=null){
				int count = cartService.deleteCart(c);
				if (count > 0) {
					GridCondition condition = new GridCondition();
	        		condition.setCondition(" WHERE U.ID ='"+user.getId()+"' AND C.STATE ='1' ");
	        		int cartNum = 0;
	        		List<Cart> cartsList = cartService.queryCartByCondition(condition);
	        		for (Iterator<Cart> iterator = cartsList.iterator(); iterator
							.hasNext();) {
						Cart itercart = iterator.next();
						cartNum+=itercart.getNum();
					}     		
	        		session.setAttribute("cartNum", cartNum);
					json.setIsSuccess("true");
					json.setMsg("商品删除成功!");
				} else {
					json.setIsSuccess("false");
					json.setMsg("商品删除失败!");
				}
			}else{
				json.setIsSuccess("false");
				json.setMsg("该条购物车数据不存在!");
			}		
		}else{
			json.setIsSuccess("false");
			json.setMsg("请重新登录!");
		}
		
		return json;
	}
}
