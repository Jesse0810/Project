package com.njwangbo.util.shopping;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class TypeConverter {
	
	public static String BasePath = "D:\\workspace\\springMyBatis\\WebRoot";
	//图片转化成base64字符串  
    public static String GetImageStr(String path)  
    {//将图片文件转化为字节数组字符串，并对其进行Base64编码处理  
        String imgFile = path;//待处理的图片 
        String suffix = imgFile.substring(imgFile.lastIndexOf(".") + 1); 
        String dataPrix = "";
        
        if("jpg".equalsIgnoreCase(suffix)){//data:image/jpeg;base64,base64编码的jpeg图片数据
        	dataPrix = "data:image/jpeg;base64,";
        } else if("ico".equalsIgnoreCase(suffix)){//data:image/x-icon;base64,base64编码的icon图片数据
        	dataPrix = "data:image/x-icon;base64,";
        } else if("gif".equalsIgnoreCase(suffix)){//data:image/gif;base64,base64编码的gif图片数据
        	dataPrix = "data:image/gif;base64,";
        } else if("png".equalsIgnoreCase(suffix)){//data:image/png;base64,base64编码的png图片数据
        	dataPrix = "data:image/png;base64,";
        }     
        InputStream in = null;  
        byte[] data = null;  
        //读取图片字节数组  
        try  
        {  
            in = new FileInputStream(imgFile);  
            data = new byte[in.available()];  
            in.read(data);  
            in.close();  
        }  
        catch (IOException e)  
        {  
            e.printStackTrace();  
        }  
        //对字节数组Base64编码  
        BASE64Encoder encoder = new BASE64Encoder();  
        return dataPrix+encoder.encode(data);//返回Base64编码过的字节数组字符串  
    } 
  //base64字符串转化成图片  
    public static String GenerateImage(String base64Data,String imgDir ,int count,String tomcatPath) throws Exception  
    {     
        String dataPrix = "";
        String data = "";

       //对数据进行判断
        if(base64Data == null || "".equals(base64Data)){
            throw new Exception("上传失败，上传图片数据为空");
        }else{
            String [] d = base64Data.split("base64,");
            if(d != null && d.length == 2){
                dataPrix = d[0];
                data = d[1];
            }else{
            	throw new Exception("上传失败，数据不合法");     
            }
        }

        //对数据进行解析，获取文件名和流数据
        String suffix = "";
        if("data:image/jpeg;".equalsIgnoreCase(dataPrix)){//data:image/jpeg;base64,base64编码的jpeg图片数据
            suffix = ".jpg";
        } else if("data:image/x-icon;".equalsIgnoreCase(dataPrix)){//data:image/x-icon;base64,base64编码的icon图片数据
            suffix = ".ico";
        } else if("data:image/gif;".equalsIgnoreCase(dataPrix)){//data:image/gif;base64,base64编码的gif图片数据
            suffix = ".gif";
        } else if("data:image/png;".equalsIgnoreCase(dataPrix)){//data:image/png;base64,base64编码的png图片数据
            suffix = ".png";
        }else{
            throw new Exception("上传图片格式不合法");
        }
        String tempFileName =  System.currentTimeMillis()  + "_" + count + suffix;
        System.out.println(tempFileName);  
        BASE64Decoder decoder = new BASE64Decoder();  
        try  
        {  
            //Base64解码  
            byte[] b = decoder.decodeBuffer(data);  
            for(int i=0;i<b.length;++i)  
            {  
                if(b[i]<0)  
                {//调整异常数据  
                    b[i]+=256;  
                }  
            }  
            //生成jpeg图片  
                  
            
            String imgFilePath = imgDir+"\\"+tempFileName;//新生成的图片
            String tomcatImgFilePath = tomcatPath +imgFilePath;
            String BaseImgFilePath = BasePath +imgFilePath;
            System.out.println(imgDir+"\\"+imgFilePath);
            OutputStream out = new FileOutputStream(tomcatImgFilePath); 
            out.write(b);  
            out.flush();
            out.close(); 
            out = new FileOutputStream(BaseImgFilePath);
            out.write(b);  
            out.flush(); 
            out.close();  
            return tempFileName;  
        }  
        catch (Exception e)  
        {  
            return null;  
        }  
    } 
    public static boolean deleteDir(File dir) {
        if (dir.isDirectory()) {
            String[] children = dir.list();//递归删除目录中的子目录下
            for (int i=0; i<children.length; i++) {
                boolean success = deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
        }
        // 目录此时为空，可以删除
        return dir.delete();
    }
    public static boolean deleteFile(File file) {
    	 if (file.exists() && file.isFile()) {
             if (file.delete()) {
                 System.out.println("删除单个文件成功！");
                 return true;
             } else {
                 System.out.println("删除单个文件失败！");
                 return false;
             }
         } else {
             System.out.println("删除单个文件失败：不存在！");
             return false;
         }
    }
    //创建文件夹
    public static boolean createFile(String imgDir) {
    	File dir = new File(BasePath+imgDir);
        if (dir.exists()) {
            if (dir.isDirectory()) {
                System.out.println("文件夹已经存在");
                TypeConverter.deleteDir(dir); 
                dir.mkdir();
            } else {
                System.out.println("有同名文件存在无法创建");
                return false;
            }
        } else {
            System.out.println("文件夹不存在，创建文件夹");
            dir.mkdir();
        }
		return true; 
    }
  //创建文件夹
    public static boolean createFile(String imgDir,String tomcatPath) {
    	File dir = new File(tomcatPath+imgDir);
        if (dir.exists()) {
            if (dir.isDirectory()) {
                System.out.println("文件夹已经存在");
                TypeConverter.deleteDir(dir); 
                dir.mkdir();
            } else {
                System.out.println("有同名文件存在无法创建");
                return false;
            }
        } else {
            System.out.println("文件夹不存在，创建文件夹");
            dir.mkdir();
        }
		return true; 
    }
    public static void main(String[] args) {
		System.out.println(BasePath);
	}
}
