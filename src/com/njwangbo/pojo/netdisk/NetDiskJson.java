package com.njwangbo.pojo.netdisk;

import java.util.List;

public class NetDiskJson {
	//返回总条数
	private int total;
	
	//返回结果集
	private List<?> fileRows;
	private List<?> folderRows;
	
	public NetDiskJson() {
		super();
	}

	public NetDiskJson(int total, List<?> fileRows, List<?> folderRows) {
		super();
		this.total = total;
		this.fileRows = fileRows;
		this.folderRows = folderRows;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<?> getFileRows() {
		return fileRows;
	}

	public void setFileRows(List<?> fileRows) {
		this.fileRows = fileRows;
	}

	public List<?> getFolderRows() {
		return folderRows;
	}

	public void setFolderRows(List<?> folderRows) {
		this.folderRows = folderRows;
	}
	
}
