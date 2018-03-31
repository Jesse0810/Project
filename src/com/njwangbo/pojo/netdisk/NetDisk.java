package com.njwangbo.pojo.netdisk;

public class NetDisk {
	private String id;
	private String name;
	private String suffix;
	private long fileSize;
	private String upperId;
	private String userId;
	private String userName;
	private String createDate;
	private String type;
	private int isRecover;
	
	public NetDisk() {
		super();
	}

	public NetDisk(String id, String name, String suffix, long fileSize, String upperId, String userId, String userName,
			String createDate, String type, int isRecover) {
		super();
		this.id = id;
		this.name = name;
		this.suffix = suffix;
		this.fileSize = fileSize;
		this.upperId = upperId;
		this.userId = userId;
		this.userName = userName;
		this.createDate = createDate;
		this.type = type;
		this.isRecover = isRecover;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSuffix() {
		return suffix;
	}

	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

	public long getFileSize() {
		return fileSize;
	}

	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}

	public String getUpperId() {
		return upperId;
	}

	public void setUpperId(String upperId) {
		this.upperId = upperId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getIsRecover() {
		return isRecover;
	}

	public void setIsRecover(int isRecover) {
		this.isRecover = isRecover;
	}
	
}
