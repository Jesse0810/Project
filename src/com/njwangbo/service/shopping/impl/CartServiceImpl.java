package com.njwangbo.service.shopping.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.njwangbo.mapper.shopping.CartMapper;
import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.shopping.Cart;
import com.njwangbo.service.shopping.CartService;


@Service("cartService")
@Transactional
public class CartServiceImpl implements CartService {
	@Autowired
	private CartMapper cartMapper;
	
	@Override
	public Cart queryCartById(Cart cart) {
		
		return cartMapper.queryCartById(cart);
	}

	@Override
	public int insertCart(Cart cart) {
		
		return cartMapper.insertCart(cart);
	}

	@Override
	public int deleteCart(Cart cart) {
		
		return cartMapper.deleteCart(cart);
	}

	@Override
	public int updateCart(Cart cart) {
		
		return cartMapper.updateCart(cart);
	}

	@Override
	public int updateCartByUserANDState(Cart cart) {
		
		return cartMapper.updateCartByUserANDState(cart);
	}

	@Override
	public List<Cart> queryCartForGridByCondition(GridCondition condition) {
		
		return cartMapper.queryCartForGridByCondition(condition);
	}

	@Override
	public List<Cart> queryCartByCondition(GridCondition condition) {
		
		return cartMapper.queryCartByCondition(condition);
	}

	@Override
	public int queryCartCount(GridCondition condition) {
		
		return cartMapper.queryCartCount(condition);
	}

	@Override
	public int updateCartNum(Cart cart) {
		
		return cartMapper.updateCartNum(cart);
	}

}
