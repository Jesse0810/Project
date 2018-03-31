package com.njwangbo.mapper.netdisk;

import java.util.List;


import com.njwangbo.pojo.netdisk.NetDisk;
import com.njwangbo.pojo.netdisk.NetDiskCondition;


public interface NetDiskMapper {
	
	public NetDisk queryNetDiskById(NetDisk netDisk);
	
	public int insertNetDisk(NetDisk netDisk);
	
	public int updateNetDisk(NetDisk netDisk);
	
	public int deleteNetDiskById(NetDisk netDisk);
	
	public int recycleNetDiskById(NetDisk netDisk);
	
	public List<NetDisk> queryNetDiskForGrid(NetDiskCondition condition);
	
	public List<NetDisk> queryNetDiskAll(NetDiskCondition condition);
	
	public int queryNetDiskCount(NetDiskCondition condition);

	public NetDisk queryNetDiskByName(NetDisk NetDisk);	
	
}
