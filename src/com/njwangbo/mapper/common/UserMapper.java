package com.njwangbo.mapper.common;

import java.util.List;

import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.common.User;

public interface UserMapper {
	public User queryUserById(User user);
	
	public int insertUser(User user);
	
	public int updateUser(User user);
	
	public int deleteUserById(User user);

	public User queryUserByNameAndPwd(User user);
	
	public List<User> queryUserForGrid(GridCondition condition);

	public int queryCount(GridCondition condition);

	public User queryUserByName(User user);

	public int registerUser(User user);
	
	
}
