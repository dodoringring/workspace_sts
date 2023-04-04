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
		int result = 0;//입력이 성공 했는지 유무를 담는 변수선언
		int qna_bno=0;//insert시에 시퀀스로 채번된 속성을 담을 변수 - 여기서는 시퀀스로 채번되는 qna_bno임  
		result = sst.update("qnaInsert", pmap);
		if(result==1) {//insert가 되면
			if(pmap.get("qna_bno")!=null) {
				qna_bno = Integer.parseInt(pmap.get("qna_bno").toString());
			}
		}
		log.info("result" +result);
		log.info("useGeneratedKeys 프로퍼티 속성값 가져오기" +qna_bno);
		return qna_bno;
	}

	public int fileInsert(Map<String, Object> pMap) {
		log.info("fileinsert 호출");
		int result = 0;//입력이 성공했는지 유무를 담는 변수 선언
		result =sst.insert("fileInsert", pMap);
		return result;
	}

	public void fileUpdate(List<Map<String, Object>> pList) {
		log.info("fileUpdate 호출");
		log.info(pList);
		int result=0;//입력이 성공했는지 유무를 담는 변수선언
		result =sst.update("fileUpdate", pList);
		log.info(result);
		
	}
	
	

}