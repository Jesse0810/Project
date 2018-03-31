package com.njwangbo.util.common;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

import javax.imageio.ImageIO;

public class MackCertPic {
	//随机成验证码字符的数组
	private static char[]charArr = {'a','b','c','d','e','f','g','h','j','k','m','b','p','q','r','s','t','w','x','y','1','3','4','5','6','7','8','9'};

	//绘制验证码
	public static String getCertPic(int width,int height,OutputStream os){
		//在缓存中开辟一个图片缓存
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		//获取绘图类 ，获取绘图画笔 //需要自己绘制验证码
		Graphics g = image.getGraphics();
		//设置绘图笔颜色
		g.setColor(new Color(0xD8D8D8));
		//绘制一个矩形区域 用来存在验证码字符
		g.fillRect(0, 0, width, height);
		//设置画笔颜色在矩形区域中画出字符
		g.setFont(new Font("Arial", Font.PLAIN, 25));
		//拼接随机生成的字符
		StringBuffer str = new StringBuffer();
		//写出随机字符
		for (int i = 0; i < 4; i++) {
			int index = (int)(Math.random()*charArr.length);
			str.append(charArr[index]);
			
		}
		// 把随机字符拼接成字符串
		String strCert = str.toString();
		
		//画出随机生成的字符并且随机颜色
		g.setColor(MackCertPic.getRandColorCode());
		g.drawString(strCert.substring(0,1), 10, 23);
		g.setColor(MackCertPic.getRandColorCode());
		g.drawString(strCert.substring(1,2), 25, 20);
		g.setColor(MackCertPic.getRandColorCode());
		g.drawString(strCert.substring(2,3), 40, 25);
		g.setColor(MackCertPic.getRandColorCode());
		g.drawString(strCert.substring(3,4), 59, 21);
		
		//生成随机类 
		Random random = new Random();
		//生成60个干扰点
		for (int i = 0; i < 60; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			g.setColor(MackCertPic.getRandColorCode());
			g.drawOval(x, y, 1, 1);
		}
		
		//生成随机线
		for (int i = 0; i < 3; i++) {
			int x1 = random.nextInt(width/2);
			int y1 = random.nextInt(height);
			int x2 = random.nextInt(width)%(width/2+1) +width/2;
			int y2 = random.nextInt(height);
			g.setColor(MackCertPic.getRandColorCode());
			g.drawLine(x1, y1, x2, y2);
		}
		
		
		
		//释放画笔
		g.dispose();
		
		//从流中写出验证码图片
		try {
			ImageIO.write(image,"JPEG", os);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return strCert;
	}
	public static Color getRandColorCode()   
    {  
		int max=128;
	    int min=0;

        //红色  
       int red;   
        //绿色  
       int green;  
        //蓝色  
        int blue;  
        //生成随机对象  
        Random random = new Random();    
        //生成红色颜色代码  
        red =random.nextInt(max)%(max-min+1) + min;
        //生成绿色颜色代码  
        green = random.nextInt(max)%(max-min+1) + min;  
        //生成蓝色颜色代码  
        blue = random.nextInt(max)%(max-min+1) + min;  
             
        Color color = new Color(red, green, blue);
           
        return color;    
    }  
	
}
