package com.njwangbo.service.netdisk.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.njwangbo.mapper.netdisk.NetDiskFolderMapper;
import com.njwangbo.pojo.netdisk.NetDiskCondition;
import com.njwangbo.pojo.netdisk.NetDiskFolder;
import com.njwangbo.service.netdisk.NetDiskFolderService;

@Service("netDiskFolderService")
@Transactional
public class NetDiskFolderServiceImpl implements NetDiskFolderService {
	@Autowired
	private NetDiskFolderMapper netDiskFolderMapper;
	
	@Override
	public NetDiskFolder queryNetDiskFolderById(NetDiskFolder netDiskFolder) {
		return netDiskFolderMapper.queryNetDiskFolderById(netDiskFolder);
	}

	@Override
	public int insertNetDiskFolder(NetDiskFolder netDiskFolder) {
		return netDiskFolderMapper.insertNetDiskFolder(netDiskFolder);
	}

	@Override
	public int updateNetDiskFolder(NetDiskFolder netDiskFolder) {
		return netDiskFolderMapper.updateNetDiskFolder(netDiskFolder);
	}

	@Override
	public int deleteNetDiskFolderById(NetDiskFolder netDiskFolder) {
		return netDiskFolderMapper.deleteNetDiskFolderById(netDiskFolder);
	}

	@Override
	public List<NetDiskFolder> queryNetDiskFolderForGrid(NetDiskCondition condition) {
		return netDiskFolderMapper.queryNetDiskFolderForGrid(condition);
	}

	@Override
	public List<NetDiskFolder> queryNetDiskFolderAll(NetDiskCondition condition) {
		return netDiskFolderMapper.queryNetDiskFolderAll(condition);
	}

	@Override
	public int queryNetDiskFolderCount(NetDiskCondition condition) {
		return netDiskFolderMapper.queryNetDiskFolderCount(condition);
	}

	@Override
	public NetDiskFolder queryNetDiskFolderByName(NetDiskFolder netDiskFolder) {
		return netDiskFolderMapper.queryNetDiskFolderByName(netDiskFolder);
	}

	@Override
	public List<NetDiskFolder> querySrc(NetDiskFolder netDiskFolder) {
		
		return netDiskFolderMapper.querySrc(netDiskFolder);
	}

	@Override
	public int insertNetDiskFolderBase(NetDiskFolder netDiskFolder) {
		return netDiskFolderMapper.insertNetDiskFolderBase(netDiskFolder);
	}

	@Override
	public int recycleNetDiskFolderById(NetDiskFolder netDiskFolder) {
		return netDiskFolderMapper.recycleNetDiskFolderById(netDiskFolder);
	}

}
