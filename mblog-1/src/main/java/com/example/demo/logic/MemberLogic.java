package com.example.demo.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MemberDao;

/*
 * 모델계층(MemberLogic[직접 오라클과 연동하지 않음] + MemberDao[데이터셋])
 * 공통된 관심사 분리(AspectJ 프레임워크 - 오픈소스 참고)
 * 트랜잭션 처리 지원받음
 */
@Service
public class MemberLogic {
	Logger logger = LoggerFactory.getLogger(MemberLogic.class);

	@Autowired
	private MemberDao memberDao = null;
	
	public List<Map<String, Object>> memberList(Map<String, Object> pMap) {
		logger.info("memberList 호출");
		List<Map<String,Object>> bList = new ArrayList<>();
		bList= memberDao.memberList(pMap);
		return bList;
	}
	
	public int memberInsert(Map<String, Object> pMap) {
		logger.info("memberInsert 호출");
		logger.info(pMap.toString());
		int result = 0;
		result = memberDao.memberInsert(pMap);
		return result;
	}
	
}