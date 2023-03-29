package com.example.demo.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.MemberDao;

@Service
public class MemberLogic {
	Logger log = LogManager.getLogger(MemberLogic.class);

	@Autowired
	private MemberDao md = null;
	
	public int memberInsert(Map<String, Object> pmap) {
		log.info("memberInsert called");
		int result = 0;
		log.info(pmap);
		result = md.memberInsert(pmap);
		return result;
	}

	public List<Map<String, Object>> memberList(Map<String, Object> pmap) {
		log.info("memberList called" + pmap);
		List<Map<String, Object>> rlist = new ArrayList<>();
		rlist = md.memberList(pmap);
		return rlist;
	}

	public int memberUpdate(Map<String, Object> pmap) {
		log.info("memberUpdate called");
		int result = 0;
		log.info(pmap);
		result = md.memberUpdate(pmap);
		return result;
	}

	public int memberDelete(Map<String, Object> pmap) {
		log.info("memberDelete called");
		int result = 0;
		log.info(pmap);
		result = md.memberDelete(pmap);
		return result;
	}

}
