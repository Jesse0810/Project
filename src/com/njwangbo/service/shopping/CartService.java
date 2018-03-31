package com.njwangbo.service.shopping;

import java.util.List;

import com.njwangbo.pojo.shopping.Cart;
import com.njwangbo.pojo.common.GridCondition;

public interface CartService {
	public Cart queryCartById(Cart cart);
	
	public int insertCart(Cart cart);

	public int deleteCart(Cart cart);
	
	public int updateCart(Cart cart);
	
	public int updateCartNum(Cart cart);
	
	public int updateCartByUserANDState(Cart cart);
	
	public List<Cart> queryCartForGridByCondition(GridCondition condition);
	
	public List<Cart> queryCartByCondition(GridCondition condition);
	
	public int queryCartCount(GridCondition condition);
}
