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
	Logger logger=LoggerFactory.getLogger(DeptDao.class);
	//DatabaseConfiguration에서 @Configuration으로 빈등록된 객체 주입받기 코드임
	//application.properties에서 물리적으로 떨어져있는 오라클 서버정보받음
	//DML문을 가진 xml문은 src/main.resources아래 있음
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate=null;
	public int deptInsert(DeptVO pVO) {
		int result=0;
		result=sqlSessionTemplate.update("deptInsert",pVO);
		return result;
	}
	public List<Map<String, Object>> deptList(Map<String, Object> pMap) {
		List<Map<String, Object>> dList=null;
		dList = sqlSessionTemplate.selectList("deptList",pMap);		
		return dList;
	}
	public int deptUpdate(DeptVO pdVO) {
		int result=0;
		result=sqlSessionTemplate.update("deptUpdate",pdVO);
		logger.info(""+result);
		return result;
	}
	public int deptDelete(int deptno) {
		int result=0;
		result=sqlSessionTemplate.delete("deptDelete",deptno);
		logger.info(""+result);
		return result;
	}
	
}
