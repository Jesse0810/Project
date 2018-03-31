package com.njwangbo.service.common;

import java.util.List;

import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.common.User;

public interface UserService {
	public User queryUserById(User user);
	
	public int insertUser(User user,String fileImgName, String tomcatPath);
	
	public int registerUser(User user);
	
	public int updateUser(User user,String fileImgName, String tomcatPath);
	
	public int deleteUserById(User user, String tomcatPath);

	public User queryUserByNameAndPwd(User user);

	public List<User> queryUserForGrid(GridCondition condition);

	public int queryCount(GridCondition condition);

	public User queryUserByName(User user);

	public int updateUser(User user);
}
