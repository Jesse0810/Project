package com.njwangbo.util.netdisk;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.njwangbo.exception.MyException;
import com.njwangbo.pojo.netdisk.NetDisk;
import com.njwangbo.pojo.netdisk.NetDiskType;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

public class FileUtil {
	public static List<NetDisk> upLoad(HttpServletRequest request, String path) throws MyException {

		List<NetDisk> list = new ArrayList<NetDisk>(); // 存放结果
		// 1、将当前上下文初始化给CommonMutipartResolver
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		// 2、检查Form中encType是否为multipart/form-data
		if (multipartResolver.isMultipart(request)) {
			// 将request转为MultipartHttpServletRequest
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			// 获取迭代器遍历multipartRequest里的文件名
			Iterator<String> iter = multipartRequest.getFileNames();
			while (iter.hasNext()) {
				// 获取文件并向下遍历
				MultipartFile file = multipartRequest.getFile(iter.next().toString());
				if (file != null) {
					// 获取文件类型，即后缀名
					String str = file.getOriginalFilename();
					String suffix = str.substring(str.lastIndexOf("."));
					String name = str.substring(0, str.lastIndexOf("."));

					// 拼接文件绝对路径
					String filePath = path + name + suffix;
					try {
						File oldFile = new File(filePath);
						if (oldFile.exists()) {
							filePath = path + name + "(1)" + suffix;
						}
						long maxsize = 2 * 1024 * 1024 * 1024;
						if (file.getSize() > maxsize) {
							throw new MyException("上传文件不能大于2G");
						}
						file.transferTo(new File(filePath));
						NetDisk diskFile = new NetDisk();
						diskFile.setName(name);
						diskFile.setFileSize(file.getSize());
						diskFile.setSuffix(suffix.substring(1));
						list.add(diskFile);
					} catch (IllegalStateException | IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

				}
			}
		}
		return list;

	}

	/*************************
	 * 删除文件夹delFolder / 删除文件夹中的所有文件delAllFile *start
	 ***********/

	/**
	 * 删除文件夹
	 * 
	 * @param folderPath
	 *            文件夹完整绝对路径 ,"Z:/xuyun/save"
	 */
	public static void delFolder(String folderPath) {
		try {
			delAllFile(folderPath); // 删除完里面所有内容
			String filePath = folderPath;
			filePath = filePath.toString();
			java.io.File myFilePath = new java.io.File(filePath);
			myFilePath.delete(); // 删除空文件夹
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 删除指定文件夹下所有文件
	 * 
	 * @param path
	 *            文件夹完整绝对路径 ,"Z:/xuyun/save"
	 */
	public static boolean delAllFile(String path) {
		boolean flag = false;
		File file = new File(path);
		if (!file.exists()) {
			return flag;
		}
		if (!file.isDirectory()) {
			return flag;
		}
		String[] tempList = file.list();
		File temp = null;
		for (int i = 0; i < tempList.length; i++) {
			if (path.endsWith(File.separator)) {
				temp = new File(path + tempList[i]);
			} else {
				temp = new File(path + File.separator + tempList[i]);
			}
			if (temp.isFile()) {
				temp.delete();
			}
			if (temp.isDirectory()) {
				delAllFile(path + "/" + tempList[i]);// 先删除文件夹里面的文件
				delFolder(path + "/" + tempList[i]);// 再删除空文件夹
				flag = true;
			}
		}
		return flag;
	}

	/************** 删除文件夹delFolder / 删除文件夹中的所有文件delAllFile *over *******/
	//读取JSON
	public static String ReadJSONForType(String path,String suffix) {
		String laststr = "";
		// 文件在class的根路径
		InputStream is = FileUtil.class.getClassLoader().getResourceAsStream(path);
		// 获取文件的位置
		String filePath = FileUtil.class.getClassLoader().getResource(path).getFile();
		System.out.println(filePath);
		// 获取的是TestJava类所在的相对路径下 ,com/test/servlet/jdbc_connection.properties"
		// InputStream
		// is2=TestJava.class.getResourceAsStream("message.propertie");
		BufferedReader reader = null;
		List<?> typeList = null;
		try {
			reader = new BufferedReader(new InputStreamReader(is,"UTF-8"));
			String tempString = null;
			while ((tempString = reader.readLine()) != null) {
				laststr = laststr + tempString;
			}
			JSONArray jsonArray = JSONArray.fromObject(laststr);
			if (jsonArray != null) {
				typeList = JSONArray.toList(jsonArray,new NetDiskType(),new JsonConfig());				
			}
			reader.close();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException el) {

				}
			}
		}
		String typeName = "其他";
		boolean typeJudge = false;
		for (int i = 0; i < typeList.size(); i++) {
			NetDiskType type = (NetDiskType) typeList.get(i);
			for(int j =0; j< type.getSuffix().length;j++){
				if(suffix.equals(type.getSuffix()[j])){
					typeName = type.getType();
					typeJudge = true;
					break;
				}
			}
			if(typeJudge){
				break;
			}
		}
		if(!typeJudge){
			typeName = "其他";
		}
		return typeName;
	}
	
	public static boolean renameFileOrFolder(String oldPath,String newPath) {
		File oldFile = new File(oldPath);  
	    // new file  
	    File newFile = new File(newPath);
	    boolean result = oldFile.renameTo(newFile);  
		return result;		
	}
}
