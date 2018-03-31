package com.njwangbo.controll.common;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import com.njwangbo.pojo.shopping.ModifyPassword;
import com.njwangbo.service.common.UserService;
import com.njwangbo.service.shopping.CartService;
import com.njwangbo.util.common.MackCertPic;


@Controller
public class UserControll {
	@Autowired
	private UserService userService;
	@Autowired
	private CartService cartService;
	@Resource
	private HttpServletRequest request;
	/**
	 * 用户登录
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/login")
	@ResponseBody
	public ResJson login(User user)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		//获取前台传过来的参数
    	//判断输入的验证码与图片上的验证码是否一致
    	//获取session
    	HttpSession session = request.getSession();
    	String sCode = session.getAttribute("code").toString();
    	String Code = user.getCode().toUpperCase();
    	if(Code.equals(sCode)){
        	User u = userService.queryUserByNameAndPwd(user);    	
        	if(u != null){
        		session.setAttribute("user", u);
        		GridCondition condition = new GridCondition();
        		condition.setCondition(" WHERE U.ID ='"+u.getId()+"' AND C.STATE ='1' ");
        		int cartNum = 0;
        		List<Cart> cartsList = cartService.queryCartByCondition(condition);
        		for (Iterator<Cart> iterator = cartsList.iterator(); iterator
						.hasNext();) {
					Cart cart = iterator.next();
					cartNum+=cart.getNum();
				}     		
        		session.setAttribute("cartNum", cartNum);
        		json.setIsSuccess("true");
        		json.setMsg("登录成功");
        	}else{
        		json.setIsSuccess("false");
        		json.setMsg("用户名或密码输入错误");
        	}
    	}else{
    		json.setIsSuccess("false");
    		json.setMsg("验证码输入错误");
    	}
    	return json;
	}
	/**
	 * 注册用户
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/register")
	@ResponseBody
	public ResJson register(User user)
			throws ServletException, IOException {

		ResJson json = new ResJson();
		//获取前台传过来的参数
    	//获取session
    	HttpSession session = request.getSession();
    	String sCode = session.getAttribute("code").toString();
    	String Code = user.getCode().toUpperCase();
    	User u = userService.queryUserByName(user);
    	if(Code.equals(sCode)){
        	if(u != null){
        		json.setIsSuccess("false");
        		json.setMsg("用户名已经注册过");
        	}else{
        		int result = userService.registerUser(user);
        		User registeruser = userService.queryUserByName(user);
            	if(result>0){
            		session.setAttribute("user", registeruser);
            		json.setIsSuccess("true");
            		json.setMsg("注册成功");
            	}else{
            		json.setIsSuccess("false");
            		json.setMsg("系统出现错误");
            	}
        	}
    	}else{
    		json.setIsSuccess("false");
    		json.setMsg("验证码输入错误");
    	}
    	return json;
	}
	/**
	 * 获取验证码结果
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/makeCertPic")
	public void makeCertPic(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		ServletOutputStream os = response.getOutputStream(); 
		// 最好这样紧挨着 response.getOutputStream() 
		HttpSession session = request.getSession(); 
		String code = MackCertPic.getCertPic(80,32,os);
		code = code.toUpperCase();
		session.setAttribute("code",code);
		os.flush(); 
		os.close();		
		// 输出数据 
	}
	/**
	 * 分页查询用户信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryUserForGrid")
	@ResponseBody
	public GridJson queryUserForGrid(GridCondition condition)
			throws ServletException, IOException {
		
		GridJson json =  new GridJson();
		
		List<User> userList = userService.queryUserForGrid(condition);
		
		int total = userService.queryCount(condition);
		
		json.setRows(userList);
		
		json.setTotal(total);

//		System.out.println(json);
		return json;
		
	}
	/**
	 * 添加用户信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/insertUser")
	@ResponseBody
	public ResJson insertUser(User user, String fileImgName)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		HttpSession session = request.getSession();
		User sessionuser = (User) session.getAttribute("user");
		
		User u = userService.queryUserByName(user);
		if (u != null) {
			json.setIsSuccess("false");
    		json.setMsg("用户名已经注册过");
		} else if(user.getLvl()>=2&&sessionuser.getLvl()<2){
			json.setIsSuccess("false");
    		json.setMsg("权限不够，不能添加超级管理员");
		} else{
			int result = userService.insertUser(user,fileImgName,request.getServletContext().getRealPath("/"));
			if (result > 0) {
				json.setIsSuccess("true");
        		json.setMsg("用户注册成功");
			} else {
				json.setIsSuccess("false");
        		json.setMsg("系统出现错误");
			}
		}
		
    	return json;
	}
	/**
	 * 按id查询单个用户信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryUserById")
	@ResponseBody
	public User queryUserById(User user)
			throws ServletException, IOException {
		
		User u  = userService.queryUserById(user);		
		return u;
	}
	/**
	 * 修改更新用户信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/updateUser")
	@ResponseBody
	public ResJson updateUser(User user,String fileImgName) throws ServletException, IOException {
		ResJson json =  new ResJson();
		HttpSession session = request.getSession();
		User sessionuser = (User) session.getAttribute("user");
		
		User u = userService.queryUserByName(user);
		User u1 = userService.queryUserById(user);
		if (u != null && u.getName().equals(user.getName())) {
			json.setIsSuccess("false");
    		json.setMsg("用户名已经存在，请修改其他用户名");
		} else if(user.getLvl()>=2&&sessionuser.getLvl()<2){
			json.setIsSuccess("false");
    		json.setMsg("权限不够，不能修改成超级管理员");
		}  else if(u1.getLvl()>=2&&sessionuser.getLvl()<2){
			json.setIsSuccess("false");
    		json.setMsg("权限不够，没有修改超级管理员的权限");
		} else {
			int result = userService.updateUser(user,fileImgName,request.getServletContext().getRealPath("/"));
			if (result > 0) {
				json.setIsSuccess("true");
	    		json.setMsg("用户信息修改成功");
			} else {
				json.setIsSuccess("false");
	    		json.setMsg("用户信息修改失败");
			}
		}
		return json;
	}
	/**
	 * 按id删除用户信息
	 * @param request
	 * @param response
	 * @return 
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/deleteUser")
	@ResponseBody
	public ResJson deleteUser(User user)
			throws ServletException, IOException {
		ResJson json =  new ResJson();
		HttpSession session = request.getSession();
		User sessionuser = (User) session.getAttribute("user");
		
		User u = userService.queryUserById(user);
		if(sessionuser.getLvl()<2&&u.getLvl()>0){
			json.setIsSuccess("false");
    		json.setMsg("权限不够，不能删除管理员以上用户");
		}else{
			int count = userService.deleteUserById(user,request.getServletContext().getRealPath("/"));
			if (count > 0) {
				json.setIsSuccess("true");
	    		json.setMsg("用户信息删除成功");
			} else {
				json.setIsSuccess("false");
	    		json.setMsg("用户信息删除失败");
			}
		}
	
		return json;
	}
	/**
	 * 用户修改密码
	 * @param request
	 * @param response
	 * @return 
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/modifyUserPassWord")
	@ResponseBody
	public ResJson modifyUserPassWord(ModifyPassword modifyPassword)
			throws ServletException, IOException {
		ResJson json =  new ResJson();
		HttpSession session = request.getSession();
		User sessionuser =  (User) session.getAttribute("user");
    	String sCode = session.getAttribute("code").toString();
    	String Code = modifyPassword.getCode().toUpperCase();
		
    	if(sessionuser!=null){
    		if(Code.equals(sCode)){
    			//为防止存在session里user的其他值没有更新，重新获取一下
	        	User u = userService.queryUserById(sessionuser);
        		if(u.getPwd().equals(modifyPassword.getOldpassword())){
    	        	//把密码修改为新密码
    	        	u.setPwd(modifyPassword.getNewpassword());
    	        	int count = userService.updateUser(u);
    	        	if(count > 0){
    	        		//修改成功清空session值
    	        		session.setAttribute("user", null);
    	        		json.setIsSuccess("true");
    	        		json.setMsg("修改密码成功,请重新登录!");
    	        	}else{
    	        		json.setIsSuccess("false");
    	        		json.setMsg("修改密码失败");
    	        	}
        		}else{
        			json.setIsSuccess("false");
            		json.setMsg("原密码输入错误");
        		}
        	}else{
        		json.setIsSuccess("false");
        		json.setMsg("验证码输入错误");
        	}
    	}else{
    		json.setIsSuccess("false");
    		json.setMsg("长时间未登录请重新登录");
    	}
    	return json;
	}
	/**
	 * 注销当前用户
	 * @param request
	 * @param response
	 * @return 
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/logOffUser")
	@ResponseBody
	public ResJson logOffUser()
			throws ServletException, IOException {
		ResJson json =  new ResJson();
		HttpSession session = request.getSession();
		session.setAttribute("user", null);
		User user = (User) session.getAttribute("user");
    	if(user == null){
    		json.setIsSuccess("true");
    		json.setMsg("注销成功");
    	}else{
    		json.setIsSuccess("false");
    		json.setMsg("注销失败");
    	}
		
    	return json;
	}
	/**
	 * 验证当前用户是否登录
	 * @param request
	 * @param response
	 * @return 
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/returnUser")
	@ResponseBody
	public User returnUser()
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
    	return user;
	}
}
