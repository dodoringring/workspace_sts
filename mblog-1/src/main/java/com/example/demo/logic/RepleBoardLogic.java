package com.example.demo.logic;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.RepleBoardDao;

@Service
public class RepleBoardLogic {
	
	Logger log = LogManager.getLogger(RepleBoardLogic.class);
	
	@Autowired
	private RepleBoardDao rdDao = null;

	public List<Map<String, Object>> qnaList(Map<String, Object> pmap) {
		log.info("qnaList called");
		List<Map<String, Object>> blist = null;
		blist = rdDao.qnaList(pmap);
		return blist;
	}

	public int qnaInsert(Map<String, Object> pmap) {
		log.info("qnaInsert called");
		int result = 0;
		result = rdDao.qnaInsert(pmap);
		return result;
	}
	
	

}