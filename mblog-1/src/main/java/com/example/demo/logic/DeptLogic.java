package com.example.demo.logic;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.DeptDao;
import com.example.demo.vo.DeptVO;

@Service
public class DeptLogic {
	Logger log = LoggerFactory.getLogger(DeptLogic.class);
	
	@Autowired
	DeptDao ddo = null;
	
	public int deptInsert(DeptVO dvo) {
		int result = 0;
		result = ddo.deptInsert(dvo);
		return result;
	}

	public List<Map<String, Object>> deptList(Map<String, Object> pmap) {
		List<Map<String, Object>> dlist = null;
		dlist = ddo.deptList(pmap);
		return dlist;
	}

	public int deptUpdate(DeptVO dvo) {
		log.info(dvo.toString());
		int result = 0;
		result = ddo.deptUpdate(dvo);
		return result;
	}

	public int deptDelete(int deptno) {
		int result = 0;
		result = ddo.deptDelete(deptno);
		return result;
	}
}
