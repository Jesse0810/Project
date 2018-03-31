package com.njwangbo.mapper.shopping;

import java.util.List;

import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.shopping.Order;

public interface OrderMapper {
	public Order queryOrderById(Order order);
	
	public int insertOrder(Order order);

	public int deleteOrder(Order order);
	
	public int updateOrder(Order order);
	
	public List<Order> queryOrderForGridByCondition(GridCondition condition);
	
	public List<Order> queryOrderByCondition(GridCondition condition);
	
	public int queryOrderCount(GridCondition condition);
}
