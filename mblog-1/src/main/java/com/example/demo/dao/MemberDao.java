package com.example.demo.dao;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;


//@Repository
@Service
public class MemberDao {
	Logger logger=LoggerFactory.getLogger(MemberDao.class);

	public int memberInsert(Map<String, Object> pMap) {
		logger.info("memberInsert호출");
		int result=0;
		return result;
	}
}
