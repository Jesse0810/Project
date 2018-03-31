package com.njwangbo.service.common.impl;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.njwangbo.mapper.common.UserMapper;
import com.njwangbo.pojo.common.GridCondition;
import com.njwangbo.pojo.common.User;
import com.njwangbo.service.common.UserService;
import com.njwangbo.util.shopping.TypeConverter;

@Service("userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserMapper userMapper;
	
	@Override
	public User queryUserById(User user) {
		
		return userMapper.queryUserById(user);
	}
	@Override
	public int insertUser(User user,String fileImgName, String tomcatPath) {
		
		String imgDir = "\\image\\user";
        System.out.println(imgDir);

		try {
			String newFileImgName = TypeConverter.GenerateImage(fileImgName, imgDir, 0, tomcatPath);
			user.setImage(newFileImgName);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return userMapper.insertUser(user);
	}
	@Override
	public int updateUser(User user) {
		
		return userMapper.updateUser(user);
	}
	@Override
	public int updateUser(User user,String fileImgName, String tomcatPath) {
		
		User u = userMapper.queryUserById(user);
		
		String imgDir = "\\image\\user";
		File uploadfile = new File(TypeConverter.BasePath + imgDir + "\\" + fileImgName);
		if (uploadfile.exists()) {
			fileImgName = TypeConverter.GetImageStr(TypeConverter.BasePath + imgDir + "\\" + fileImgName);
		}
		TypeConverter.deleteFile(new File(TypeConverter.BasePath + imgDir + u.getImage()));
		TypeConverter.deleteFile(new File(tomcatPath + imgDir + u.getImage()));

		try {
			String newFileName = TypeConverter.GenerateImage(fileImgName, imgDir, 0, tomcatPath);
			user.setImage(newFileName);
		} catch (Exception e) {

			e.printStackTrace();
		}

		return userMapper.updateUser(user);
	}
	@Override
	public int deleteUserById(User user, String tomcatPath) {
		
		User u = userMapper.queryUserById(user);
		
		String imgDir = "\\image\\user\\"+u.getImage();				
		
		TypeConverter.deleteFile(new File(TypeConverter.BasePath+imgDir));
		TypeConverter.deleteFile(new File(tomcatPath+imgDir));
		
		return userMapper.deleteUserById(user);
	}
	@Override
	public User queryUserByNameAndPwd(User user) {
		
		return userMapper.queryUserByNameAndPwd(user);
	}
	@Override
	public List<User> queryUserForGrid(GridCondition condition) {
		
		return userMapper.queryUserForGrid(condition);
	}
	@Override
	public int queryCount(GridCondition condition) {
		
		return userMapper.queryCount(condition);
	}
	@Override
	public User queryUserByName(User user) {
		
		return userMapper.queryUserByName(user);
	}
	@Override
	public int registerUser(User user) {
		
		return userMapper.registerUser(user);
	}
	


}
