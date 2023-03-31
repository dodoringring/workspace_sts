package com.example.demo.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RepleBoardDao {
	
	@Autowired
	private SqlSessionTemplate sst = null;
	
	Logger log = LogManager.getLogger(RepleBoardDao.class);

	public List<Map<String, Object>> qnaList(Map<String, Object> pmap) {
		log.info("qnaList called");
		List<Map<String, Object>> blist = null;
		blist = sst.selectList("qnaList", pmap);
		return blist;
	}

	public int qnaInsert(Map<String, Object> pmap) {
		log.info("qnaInsert called");
		int result = 0;
		result = sst.update("qnaInsert", pmap);
		return result;
	}
	
	

}