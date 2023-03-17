package com.example.demo.dao;

import java.util.List;
import java.util.Map;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//@Repository
@Service
public class MemberDao {
	Logger logger = LoggerFactory.getLogger(MemberDao.class);
	@Autowired
	private SqlSessionTemplate sqlSessionTemplate = null;
 
	public List<Map<String, Object>> memberList(Map<String, Object> pMap) {
		logger.info("memberList호출");
		List<Map<String,Object>> mList = sqlSessionTemplate.selectList("memberList", pMap);
		return mList;
	}
	public int memberInsert(Map<String, Object> pMap) {
		logger.info("memberInsert호출");
		int result = 0;
		
		return result;
	}
	
}