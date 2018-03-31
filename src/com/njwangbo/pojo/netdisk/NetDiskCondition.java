package com.njwangbo.pojo.netdisk;

/**
 * 分页所用参数
 * @author njwb
 *
 */
public class NetDiskCondition {
	private int pageSize;
	private int pageNum;
	private String condition;
	private String upperId;
	private String delList;
	private String sidx = "name";
	private String sort;
	
	public NetDiskCondition() {
		super();
	}
	
	public NetDiskCondition(int pageSize, int pageNum, String condition, String upperId, String delList, String sidx,
			String sort) {
		super();
		this.pageSize = pageSize;
		this.pageNum = pageNum;
		this.condition = condition;
		this.upperId = upperId;
		this.delList = delList;
		this.sidx = sidx;
		this.sort = sort;
	}



	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNum() {
		return pageNum;
	}

	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getUpperId() {
		return upperId;
	}

	public void setUpperId(String upperId) {
		this.upperId = upperId;
	}

	public String getDelList() {
		return delList;
	}

	public void setDelList(String delList) {
		this.delList = delList;
	}

	public String getSidx() {
		return sidx;
	}

	public void setSidx(String sidx) {
		this.sidx = sidx;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	
}

