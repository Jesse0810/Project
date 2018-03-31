package com.njwangbo.mapper.netdisk;

import java.util.List;

import com.njwangbo.pojo.netdisk.NetDiskCondition;
import com.njwangbo.pojo.netdisk.NetDiskFolder;


public interface NetDiskFolderMapper {
	
	public NetDiskFolder queryNetDiskFolderById(NetDiskFolder netDiskFolder);
	
	public int insertNetDiskFolder(NetDiskFolder netDiskFolder);
	
	public int insertNetDiskFolderBase(NetDiskFolder netDiskFolder);
	
	public int updateNetDiskFolder(NetDiskFolder netDiskFolder);
	
	public int recycleNetDiskFolderById(NetDiskFolder netDiskFolder);
	
	public int deleteNetDiskFolderById(NetDiskFolder netDiskFolder);
	
	public List<NetDiskFolder> queryNetDiskFolderForGrid(NetDiskCondition condition);
	
	public List<NetDiskFolder> queryNetDiskFolderAll(NetDiskCondition condition);
	
	public int queryNetDiskFolderCount(NetDiskCondition condition);

	public NetDiskFolder queryNetDiskFolderByName(NetDiskFolder netDiskFolder);	
	
	public List<NetDiskFolder> querySrc(NetDiskFolder netDiskFolder);
	
}
