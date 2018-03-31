package com.njwangbo.service.shopping;

import java.util.List;

import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.shopping.Cart;
import com.njwangbo.pojo.shopping.Order;

public interface OrderService {
	
	public Order queryOrderById(Order order);
	
	public int insertOrder(Order order,List<Cart> cartList);

	public int deleteOrder(Order order);
	
	public int updateOrder(Order order);
	
	public List<Order> queryOrderForGridByCondition(GridCondition condition);
	
	public List<Order> queryOrderByCondition(GridCondition condition);
	
	public int queryOrderCount(GridCondition condition);
}
