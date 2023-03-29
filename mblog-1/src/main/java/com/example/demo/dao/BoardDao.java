package com.example.demo.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

//@Repository
@Service
public class BoardDao {
	Logger logger = LoggerFactory.getLogger(BoardDao.class);

	public List<Map<String, Object>> boardList(Map<String, Object> pMap) {
		logger.info("boardList");
		List<Map<String,Object>> bList = null;
		if(bList == null) {//NPE 방어코드
			bList = new ArrayList<>();
			Map<String, Object> rMap = new HashMap<>();
			rMap.put("BM_TITLE", "젤라또 맛집 Facci");
			rMap.put("BM_WRITER", "김둘리");
			bList.add(rMap);
			rMap = new HashMap<>();
			rMap.put("BM_TITLE", "젤라또 맛집 Giolitti");
			rMap.put("BM_WRITER", "박또치");
			bList.add(rMap);
			rMap = new HashMap<>();
			rMap.put("BM_TITLE", "젤라또 맛집 Old Bridge");
			rMap.put("BM_WRITER", "희동이");
			bList.add(rMap);
		}
		return bList;
	}
}
