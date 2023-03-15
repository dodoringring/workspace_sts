package com.example.demo.logic;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MemberDao;


@Service
public class MemberLogic {
	Logger logger=LoggerFactory.getLogger(MemberLogic.class);
	@Autowired
	private MemberDao memberDao=null;//capsulation을 위해 private으로 한다.

	public int memberInsert(Map<String, Object> pMap) {
		logger.info("memberInsert호출");
		int result=0;
		logger.info(pMap.toString());
		result=memberDao.memberInsert(pMap);
		return result;
	}
}
