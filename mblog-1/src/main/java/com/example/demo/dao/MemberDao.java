package com.example.demo.dao;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

//@Repository
@Service
public class MemberDao {
	Logger log = LogManager.getLogger(MemberDao.class);

	@Autowired
	private SqlSessionTemplate sst = null;

	public int memberInsert(Map<String, Object> pmap) {
		log.info("memberInsert called");
		int result = 0;
		result = sst.update("memberInsert", pmap);//insert는 returnType이 object라 안쓰기로...
		return result;
	}
 
	public List<Map<String, Object>> memberList(Map<String, Object> pMap) {
		log.info("memberList called");
		List<Map<String,Object>> mList = sst.selectList("memberList", pMap);
		return mList;
	}

	public int memberUpdate(Map<String, Object> pmap) {
		log.info("memberUpdate called");
		int result = 0;
		result = sst.update("memberUpdate", pmap);
		return result;
	}

	public int memberDelete(Map<String, Object> pmap) {
		log.info("memberDelete called");
		int result = 0;
		result = sst.delete("memberDelete", pmap);//update여도 에러가 나지 않지만 일단 걍 delete로 ㄱ
		return result;
	}
}
