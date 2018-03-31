package com.njwangbo.pojo.netdisk;

public class NetDiskType {
	private String type;
	private String name;
	private String[] suffix;
	public NetDiskType(String type, String name, String[] suffix) {
		super();
		this.type = type;
		this.name = name;
		this.suffix = suffix;
	}
	public NetDiskType() {
		super();
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String[] getSuffix() {
		return suffix;
	}
	public void setSuffix(String[] suffix) {
		this.suffix = suffix;
	}
	
	
}
