package com.njwangbo.controll.netdisk;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.njwangbo.exception.MyException;
import com.njwangbo.pojo.common.GridJson;
import com.njwangbo.pojo.common.ResJson;
import com.njwangbo.pojo.common.User;
import com.njwangbo.pojo.netdisk.NetDisk;
import com.njwangbo.pojo.netdisk.NetDiskCondition;
import com.njwangbo.pojo.netdisk.NetDiskCommon;
import com.njwangbo.pojo.netdisk.NetDiskFolder;
import com.njwangbo.pojo.netdisk.NetDiskJson;
import com.njwangbo.service.common.UserService;
import com.njwangbo.service.netdisk.NetDiskFolderService;
import com.njwangbo.service.netdisk.NetDiskService;
import com.njwangbo.util.common.PropertyUtil;
import com.njwangbo.util.netdisk.FileUtil;


@Controller
public class NetDiskControll {
	@Autowired
	private NetDiskService netDiskService;
	@Autowired
	private NetDiskFolderService netDiskFolderService;
	@Autowired
	private UserService userService;
	@Resource
	private HttpServletRequest request;
	
	/**
	 * 网盘用户登录
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/loginNetDisk")
	@ResponseBody
	public ResJson loginNetDisk(User user)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		//获取前台传过来的参数
    	//判断输入的验证码与图片上的验证码是否一致
    	//获取session
    	HttpSession session = request.getSession();
    	String sCode = session.getAttribute("code").toString();
    	String Code = user.getCode().toUpperCase();
    	try {
    		if(Code.equals(sCode)){
            	User u = userService.queryUserByNameAndPwd(user);    	
            	if(u != null){
            		NetDiskCondition condition = new NetDiskCondition();
            		String Condition = " WHERE U.ID = '"+u.getId()+"' ";
            		condition.setCondition(Condition);
            		int result = netDiskFolderService.queryNetDiskFolderCount(condition);
            		if(result == 0){
            			String path = PropertyUtil.getProperty("db.netdiskpath") + "\\"
        						+ u.getId();
            			File file = new File(path);
            			if(!file.exists()&&!file.isDirectory()){
            				file.mkdir();
            			}else{
            				FileUtil.delAllFile(path);
            			}
            			NetDiskFolder folder = new NetDiskFolder();
            			folder.setName("全部");
            			folder.setUserId(u.getId());
            			result = netDiskFolderService.insertNetDiskFolderBase(folder);
            		}
            		if(result > 0){
            			NetDiskCondition Ncondition = new NetDiskCondition();
            			String NCondition = " WHERE U.ID = '"+u.getId()+"' AND F.LVL = '0' ";
            			Ncondition.setCondition(NCondition);
            			List<NetDiskFolder> folderlist = netDiskFolderService.queryNetDiskFolderAll(Ncondition);
            			NetDiskFolder f = folderlist.get(0);
            			session.setAttribute("basefolder", f);
            			session.setAttribute("user", u);
                		json.setIsSuccess("true");
                		json.setMsg("登录成功");
            		}else{
            			throw new MyException("网盘新用户创建失败!");
            		}
            	}else{           		
            		throw new MyException("用户名或密码输入错误!");
            	}
        	}else{
        		throw new MyException("验证码输入错误!");
        	}
		} catch (MyException e) {
			json.setIsSuccess("false");
    		json.setMsg(e.getMessage());
		}	
    	return json;
	}
	
	/**
	 * 按id查询单个网盘文件
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryNetDiskById")
	@ResponseBody
	public NetDisk queryNetDiskById(NetDisk netDisk)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		netDisk.setId(user.getId());
		netDisk.setName(user.getName());
		NetDisk n = netDiskService.queryNetDiskById(netDisk);
		return n;
	}
	/**
	 * 文件操作预处理
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/preFileManipulation")
	@ResponseBody
	public void preFileManipulation(NetDisk netDisk)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		String upperId = request.getParameter("upperId");
		String relPath = request.getParameter("relPath");
		session.setAttribute("upperId", upperId);
		session.setAttribute("relPath", relPath);
//		System.out.println(session.getAttribute("upperId"));
//		System.out.println(session.getAttribute("relPath"));
	}
	/**
	 * 分页查询NetDisk表数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryNetDiskForGrid")
	@ResponseBody
	public GridJson queryNetDiskForGrid(NetDiskCondition condition)
			throws ServletException, IOException {

		GridJson json =  new GridJson();
		
		List<NetDisk> netDiskList = netDiskService.queryNetDiskForGrid(condition);
		
		int total = netDiskService.queryNetDiskCount(condition);
		
		json.setRows(netDiskList);
		
		json.setTotal(total);
		
		return json;		
	}
	/**
	 * 查询NetDisk表所有数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryNetDiskAll")
	@ResponseBody
	public GridJson queryNetDiskAll(NetDiskCondition condition)
			throws ServletException, IOException {

		GridJson json =  new GridJson();

		List<NetDisk> netDiskList = netDiskService.queryNetDiskAll(condition);
		
		int total = netDiskService.queryNetDiskCount(condition);
		
		json.setRows(netDiskList);
		
		json.setTotal(total);
		
		return json;		
	}
	/**
	 * 上传网盘文件,并添加信息到数据库里
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/uploadNetDiskFile")
	@ResponseBody
	public ResJson uploadNetDiskFile(@RequestParam("file") MultipartFile myfile)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		HttpSession session = request.getSession();
		String upperId = session.getAttribute("upperId").toString();
		String relPath = session.getAttribute("relPath").toString();
		User user = (User) session.getAttribute("user");
		try {
			if (upperId != null && relPath != null) {
				String path = PropertyUtil.getProperty("db.netdiskpath") + "\\"
						+ user.getId() + relPath.replaceAll("/", "\\\\") + "\\";
				System.out.println(path);
				// 上传文件

				if (myfile != null) {
					// 获取文件类型，即后缀名
					String str = myfile.getOriginalFilename();
					String suffix = str.substring(str.lastIndexOf("."));
					String name = str.substring(0, str.lastIndexOf("."));

					// 拼接文件绝对路径
					String filePath = path + name + suffix;
					File oldFile = new File(filePath);
//					while (oldFile.exists()) {
//						if (oldFile.exists()) {
//							name+="(1)";
//							filePath = path + name + suffix;
//						}
//						oldFile = new File(filePath);
//					}
					if(oldFile.exists()){
						throw new MyException("文件名已经存在，请输入其他名字！");
					}
					if (myfile.getSize()>Integer.MAX_VALUE) {
						throw new MyException("上传文件不能大于2G");
					}
					if((name + suffix).length()>255){
						throw new MyException("文件名过长");
					}
					if(!name.matches("[^\\s\\\\/:\\*\\?\\\"<>\\|](\\x20|[^\\s\\\\/:\\*\\?\\\"<>\\|])*[^\\s\\\\/:\\*\\?\\\"<>\\|\\.]$")){
						throw new MyException("文件名中有非法字符");
					}
					myfile.transferTo(new File(filePath));
					NetDisk diskFile = new NetDisk();
					diskFile.setName(name);
					diskFile.setFileSize(myfile.getSize());
					suffix = suffix.substring(1).toLowerCase();
					diskFile.setSuffix(suffix);
					diskFile.setUserId(user.getId());
					diskFile.setUpperId(upperId);
					diskFile.setType(FileUtil.ReadJSONForType("fileType.json",suffix));			
					int result = netDiskService.insertNetDisk(diskFile);
					if (result > 0) {
						json.setIsSuccess("true");
						json.setMsg(name +"."+suffix+" 文件上传成功！");
					} else {
						throw new MyException("上传文件信息插入数据库失败");
					}

				}else{
					throw new MyException("上传文件为空");
				}		
			} else {
				throw new MyException("上传路径没有找到");
			}
		} catch (IllegalStateException | IOException e) {
			json.setIsSuccess("false");
			json.setMsg("上传文件时出错");
		} catch (MyException e) {
			json.setIsSuccess("false");
			json.setMsg(e.getMessage());
		}
		return json;
	}
	/**
	 * 更新网盘文件(夹)名
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/updateNetDiskName")
	@ResponseBody
	public ResJson updateNetDiskName(NetDiskCommon netDisk)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		int result = 0;
		try {
			if (user != null) {
				String type = netDisk.getType();
				String path = PropertyUtil.getProperty("db.netdiskpath") + "\\"
						+ user.getId() + netDisk.getRelPath().replaceAll("/", "\\\\") + "\\";
				System.out.println(path);
				if (type.equals("file")) {
					NetDisk n = new NetDisk();
					n.setId(netDisk.getId());
					n.setUserId(user.getId());
					NetDisk netdiskfile = netDiskService.queryNetDiskById(n);
					if (netdiskfile != null) {
						//重命名文件
						if(FileUtil.renameFileOrFolder(path+netdiskfile.getName()+"."+netdiskfile.getSuffix(), 
								path+netDisk.getName()+"."+netDisk.getSuffix())){
							netdiskfile.setName(netDisk.getName());
							if (!netdiskfile.getSuffix()
									.equals(netDisk.getSuffix())) {
								netdiskfile.setType(FileUtil.ReadJSONForType(
										"fileType.json", netDisk.getSuffix()));
								netdiskfile.setSuffix(netDisk.getSuffix());
							}
							netdiskfile.setUserId(user.getId());
							result = netDiskService.updateNetDisk(netdiskfile);
							if (result > 0) {
								json.setIsSuccess("true");
								json.setMsg("网盘文件名修改成功！");
							} else {
								throw new MyException("网盘文件名修改失败！");
							}
						}else{
							throw new MyException("网盘文件名修改失败！");
						}						
					} else {
						throw new MyException("文件没找到！");
					}
				} else if (type.equals("folder")) {
					NetDiskFolder n = new NetDiskFolder();
					n.setId(netDisk.getId());
					n.setUserId(user.getId());
					NetDiskFolder netdiskfolder = netDiskFolderService
							.queryNetDiskFolderById(n);
					if (netdiskfolder != null) {
						if(FileUtil.renameFileOrFolder(path+netdiskfolder.getName(), 
								path+netDisk.getName())){
							netdiskfolder.setName(netDisk.getName());
							netdiskfolder.setUserId(user.getId());
							result = netDiskFolderService
									.updateNetDiskFolder(netdiskfolder);
							if (result > 0) {
								json.setIsSuccess("true");
								json.setMsg("网盘文件夹名修改成功！");
							} else {
								throw new MyException("网盘文件夹名修改失败！");
							}
						}else{
							throw new MyException("网盘文件夹名修改失败！");
						}		
					} else {
						throw new MyException("文件夹没找到！");
					}
				}
			} else {
				throw new MyException("登录失效，请重新登录！");
			}

		} catch (MyException e) {
			json.setIsSuccess("false");
			json.setMsg(e.getMessage());
		}

		return json;
	}
	/**
	 * 批量删除网盘文件和文件夹进回收站
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/recycleNetDiskFileANDFolder")
	@ResponseBody
	public ResJson recycleNetDiskFileANDFolder(NetDiskCondition condition) throws ServletException, IOException {
		ResJson json =  new ResJson();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		List<NetDiskCommon> delList = new ArrayList<NetDiskCommon>();
		JSONArray jsonArray = JSONArray.fromObject(condition.getDelList());
		delList = JSONArray.toList(jsonArray, NetDiskCommon.class);
		try {
			if(user != null){
				int count = 0;
				for (int i = 0; i < delList.size(); i++) {
					if(delList.get(i).getType().equals("file")){
						NetDisk file = new NetDisk();
						file.setUserId(user.getId());
						file.setId(delList.get(i).getId());
						count = netDiskService.recycleNetDiskById(file);
					}else if(delList.get(i).getType().equals("folder")){
						NetDiskFolder folder = new NetDiskFolder();
						folder.setUserId(user.getId());
						folder.setId(delList.get(i).getId());					
						count = netDiskFolderService.recycleNetDiskFolderById(folder);
					}
				}
				if (count > 0) {
					json.setIsSuccess("true");
		    		json.setMsg("网盘文件删除成功");
				} else {
					throw new MyException("网盘文件删除失败");
				}
			}else{
				throw new MyException("登录失效，请重新登录");
			}
			
		} catch (MyException e) {
			json.setIsSuccess("false");
			json.setMsg(e.getMessage());
		}	

		return json;
	}
	
	@RequestMapping("/downLoadNetDiskFile")
	@ResponseBody
	public String downLoadNetDiskFile(NetDisk netDisk) {
		HttpSession session = request.getSession();
		String relPath = session.getAttribute("relPath").toString();
		User user = (User) session.getAttribute("user");

		String path = "http://"+request.getLocalAddr()+":"+request.getLocalPort()+"/netdisk/"+user.getId() + relPath + "/"+ netDisk.getName() + "." + netDisk.getSuffix();
		System.out.println(path);
		return path;
	}
	
	/**
	 * 按id查询单个网盘文件夹
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryNetDiskFolderById")
	@ResponseBody
	public NetDiskFolder queryNetDiskFolderById(NetDiskFolder netDiskFolder)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		netDiskFolder.setId(user.getId());
		netDiskFolder.setName(user.getName());
		NetDiskFolder f = netDiskFolderService.queryNetDiskFolderById(netDiskFolder);
		return f;
	}
	/**
	 * 查询NetDiskFolder表所有数据
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryNetDiskFolderAndFileAll")
	@ResponseBody
	public NetDiskJson queryNetDiskFolderAndFileAll(NetDiskCondition condition)
			throws ServletException, IOException {

		NetDiskJson json =  new NetDiskJson();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		String Condition = " WHERE U.ID = '"+user.getId()+"' AND UPPERID = '"+condition.getUpperId()+"' AND ISRECOVER = '0' ";
		condition.setCondition(Condition);
		
		List<NetDisk> netDiskList = netDiskService.queryNetDiskAll(condition);		
		int totalFile = netDiskService.queryNetDiskCount(condition);		
		json.setFileRows(netDiskList);
		
		if(condition.getSidx().equals("fileSize")){
			condition.setSidx("name");
		}
		
		List<NetDiskFolder> netDiskFolderList = netDiskFolderService.queryNetDiskFolderAll(condition);		
		int totalFolder = netDiskFolderService.queryNetDiskFolderCount(condition);		
		json.setFolderRows(netDiskFolderList);
		
		json.setTotal(totalFolder+totalFile);
		
		return json;		
	}
	/**
	 * 添加网盘文件夹信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/insertNetDiskFolder")
	@ResponseBody
	public ResJson insertNetDiskFolder(NetDiskFolder netDiskFolder)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		netDiskFolder.setId(user.getId());
		netDiskFolder.setName(user.getName());
		NetDiskFolder g = netDiskFolderService.queryNetDiskFolderByName(netDiskFolder);
		if (g != null) {
			json.setIsSuccess("false");
    		json.setMsg("网盘文件夹名已经有了！");
		} else {
			int result = netDiskFolderService.insertNetDiskFolder(netDiskFolder);
			if (result > 0) {
				json.setIsSuccess("true");
        		json.setMsg("网盘文件夹上传成功");
			} else {
				json.setIsSuccess("false");
        		json.setMsg("系统出现错误");
			}
		}
		
    	return json;
	}
	/**
	 * 新建网盘文件夹
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/newNetDiskFolder")
	@ResponseBody
	public ResJson newNetDiskFolder(NetDiskFolder netDiskFolder)
			throws ServletException, IOException {
		ResJson json = new ResJson();
		HttpSession session = request.getSession();
		String upperId = session.getAttribute("upperId").toString();
		String relPath = session.getAttribute("relPath").toString();
		User user = (User) session.getAttribute("user");
		int result = 0;
		try {
			if (user != null) {
				if (upperId != null && relPath != null) {
					netDiskFolder.setUpperId(upperId);
					netDiskFolder.setUserId(user.getId());
					String path = PropertyUtil.getProperty("db.netdiskpath") + "\\"
							+ user.getId() + relPath.replaceAll("/", "\\\\") + "\\";
					System.out.println(path);
					File folder = new File(path+netDiskFolder.getName());
					if(folder.mkdir()){
						result = netDiskFolderService.insertNetDiskFolder(netDiskFolder);
						if(result > 0){
							json.setIsSuccess("true");
							json.setMsg("新建"+netDiskFolder.getName()+"文件夹成功！");
						}else{
							throw new MyException("新建文件夹失败!");
						}
					}else {
						throw new MyException("新建文件夹失败!");
					}			
				}else {
					throw new MyException("上传路径没有找到");
				}
			} else {
				throw new MyException("登录失效，请重新登录！");
			}

		} catch (MyException e) {
			json.setIsSuccess("false");
			json.setMsg(e.getMessage());
		}

		return json;
	}
	/**
	 * 按id删除网盘文件夹
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/queryCountByFileType")
	@ResponseBody
	public ResJson queryCountByFileType() throws ServletException, IOException {
		ResJson json =  new ResJson();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
//		netDiskFolder.setUserId(user.getId());
//		int count = netDiskFolderService.deleteNetDiskFolderById(netDiskFolder);
//		if (count > 0) {
//			json.setIsSuccess("true");
//    		json.setMsg("网盘文件夹删除成功");
//		} else {
//			json.setIsSuccess("true");
//    		json.setMsg("网盘文件夹删除失败");
//		}

		return json;
	}
	/**
	 * 按id删除网盘文件夹
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/deleteNetDiskFolder")
	@ResponseBody
	public ResJson deleteNetDiskFolder(NetDiskFolder netDiskFolder) throws ServletException, IOException {
		ResJson json =  new ResJson();
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		netDiskFolder.setUserId(user.getId());
		int count = netDiskFolderService.deleteNetDiskFolderById(netDiskFolder);
		if (count > 0) {
			json.setIsSuccess("true");
    		json.setMsg("网盘文件夹删除成功");
		} else {
			json.setIsSuccess("true");
    		json.setMsg("网盘文件夹删除失败");
		}

		return json;
	}
	
	/**
	 * 查找文件（或文件夹）路径
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	@RequestMapping("/querySrc")
	@ResponseBody
	public List<NetDiskFolder> querySrc(NetDiskFolder folder) throws ServletException, IOException {	
		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		folder.setUserId(user.getId());
		List<NetDiskFolder> srcList = netDiskFolderService.querySrc(folder);
		if(srcList.size()==0){
			NetDiskCondition condition = new NetDiskCondition();
			String Condition = " WHERE U.ID = '"+user.getId()+"' AND F.LVL = '0' ";
			condition.setCondition(Condition);
			List<NetDiskFolder> folderlist = netDiskFolderService.queryNetDiskFolderAll(condition);
			NetDiskFolder f = folderlist.get(0);
			srcList.add(f);
		}
		
		return srcList;
	}
}
