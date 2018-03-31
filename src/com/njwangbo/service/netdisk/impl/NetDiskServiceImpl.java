package com.njwangbo.service.netdisk.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.njwangbo.mapper.netdisk.NetDiskMapper;
import com.njwangbo.pojo.netdisk.NetDisk;
import com.njwangbo.pojo.netdisk.NetDiskCondition;
import com.njwangbo.service.netdisk.NetDiskService;

@Service("netDiskService")
@Transactional
public class NetDiskServiceImpl implements NetDiskService {
	@Autowired
	private NetDiskMapper netDiskMapper;
	
	@Override
	public NetDisk queryNetDiskById(NetDisk netDisk) {
		return netDiskMapper.queryNetDiskById(netDisk);
	}

	@Override
	public int insertNetDisk(NetDisk netDisk) {
		return netDiskMapper.insertNetDisk(netDisk);
	}

	@Override
	public int updateNetDisk(NetDisk netDisk) {
		return netDiskMapper.updateNetDisk(netDisk);
	}

	@Override
	public int deleteNetDiskById(NetDisk netDisk) {
		return netDiskMapper.deleteNetDiskById(netDisk);
	}

	@Override
	public List<NetDisk> queryNetDiskForGrid(NetDiskCondition condition) {
		return netDiskMapper.queryNetDiskForGrid(condition);
	}

	@Override
	public List<NetDisk> queryNetDiskAll(NetDiskCondition condition) {
		return netDiskMapper.queryNetDiskAll(condition);
	}

	@Override
	public int queryNetDiskCount(NetDiskCondition condition) {
		return netDiskMapper.queryNetDiskCount(condition);
	}

	@Override
	public NetDisk queryNetDiskByName(NetDisk NetDisk) {
		return netDiskMapper.queryNetDiskByName(NetDisk);
	}

	@Override
	public int recycleNetDiskById(NetDisk netDisk) {
		return netDiskMapper.recycleNetDiskById(netDisk);
	}

}
