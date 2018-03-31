package com.njwangbo.pojo.netdisk;

public class NetDiskFolder {
	private String id;
	private String name;
	private String upperId;
	private String userId;
	private String userName;
	private String createDate;
	private int lvl;
	private int isRecover;
	
	public NetDiskFolder() {
		super();
	}

	public NetDiskFolder(String id, String name, String upperId, String userId, String userName, String createDate,
			int lvl, int isRecover) {
		super();
		this.id = id;
		this.name = name;
		this.upperId = upperId;
		this.userId = userId;
		this.userName = userName;
		this.createDate = createDate;
		this.lvl = lvl;
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

	public int getlvl() {
		return lvl;
	}

	public void setlvl(int lvl) {
		this.lvl = lvl;
	}

	public int getIsRecover() {
		return isRecover;
	}

	public void setIsRecover(int isRecover) {
		this.isRecover = isRecover;
	}

}
