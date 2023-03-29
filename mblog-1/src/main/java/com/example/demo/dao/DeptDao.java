package com.example.demo.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.vo.DeptVO;

@Repository
public class DeptDao {
	Logger log = LoggerFactory.getLogger(DeptDao.class);
	
	//DatabaseConfiguration에서 @Configuration으로 빈등록된 객체 주입받기 코드임
	//application.properties에서 물리적으로 떨어져 있는 오라클 서버 정보 받음
	//DML문을 가진 xml은 src/main/resources아래 있음.
	
	@Autowired
	private SqlSessionTemplate sst = null;

	public int deptInsert(DeptVO dvo) {
		int result = 0;
		result = sst.update("deptInsert", dvo);
		return result;
	}

	public List<Map<String, Object>> deptList(Map<String, Object> pmap) {
		List<Map<String, Object>> dlist = null;
		dlist = sst.selectList("deptList", pmap);
		return dlist;
	}

	public int deptUpdate(DeptVO dvo) {
		log.info(dvo.toString());
		int result = 0;
		result = sst.update("deptUpdate", dvo);
		log.info(result + "");
		return result;
	}

	public int deptDelete(int deptno) {
		int result = 0;
		result = sst.delete("deptDelete", deptno);
		log.info(result + "");
		return result;
	}
	
}
