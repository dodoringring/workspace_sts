package com.example.demo.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

//@Repository 해도 되는데 서비스로도 충분...? 넓은 의미에서 서비스에 포함
@Service
public class BoardDao {
	Logger logger =LoggerFactory.getLogger(BoardDao.class);

	public List<Map<String, Object>> boardList(Map<String, Object> pMap) {
		logger.info("boardDao");
		List<Map<String,Object>> bList=null;
		if(bList==null) {
			bList=new ArrayList<>();
			Map<String, Object> rMap=new HashMap<>();
			rMap.put("BM_TITLE", "공지사항 1");
			rMap.put("BM_WRITER", "김희도");
			bList.add(rMap);
			
			rMap=new HashMap<>();
			rMap.put("BM_TITLE", "공지사항 2");
			rMap.put("BM_WRITER", "김완도");
			bList.add(rMap);
			
			rMap=new HashMap<>();
			rMap.put("BM_TITLE", "공지사항 3");
			rMap.put("BM_WRITER", "도도희");
			bList.add(rMap);
		}
		
		return bList;
	}

}
