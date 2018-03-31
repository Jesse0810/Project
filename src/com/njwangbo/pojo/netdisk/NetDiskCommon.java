package com.njwangbo.pojo.netdisk;

public class NetDiskCommon {
	private String id;
	private String name;  
	private String type;
	private String upperId;
	private String relPath;
	private String suffix;
	
	public NetDiskCommon() {
		super();
	}

	public NetDiskCommon(String id, String name, String type, String upperId,
			String relPath, String suffix) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.upperId = upperId;
		this.relPath = relPath;
		this.suffix = suffix;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUpperId() {
		return upperId;
	}

	public void setUpperId(String upperId) {
		this.upperId = upperId;
	}

	public String getRelPath() {
		return relPath;
	}

	public void setRelPath(String relPath) {
		this.relPath = relPath;
	}

	public String getSuffix() {
		return suffix;
	}

	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

}
