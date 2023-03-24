package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.logging.log4j.*;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.logic.BoardLogic;
import com.example.demo.logic.MemberLogic;
import com.google.gson.Gson;

@RestController
@RequestMapping("/member/*")
public class RestMemberController {
	Logger logger = LogManager.getLogger(RestMemberController.class);
	
	@Autowired//자동으로 의존성을 주입
	private MemberLogic memberLogic = null;
	@PostMapping("memberInsert")
	public String memberInsert(@RequestBody Map<String, Object> pMap) {
		//리액트에서 body에 객체리터럴{}로 넘겨준 정보를 Map이나 VO에 담을 수 있다. 
		logger.info("memberInsert");
		logger.info(pMap.toString());
		int result=0;
		result=memberLogic.memberInsert(pMap);
		logger.info(result);
		return String.valueOf(result);
	}

	@PostMapping("memberUpdate")
	public String memberUpdate (@RequestBody Map<String, Object> pMap) {
		logger.info("memberUpdate => " + pMap);
		int result = 0;
		result=memberLogic.memberUpdate(pMap);
		logger.info(result);
		return String.valueOf(result);
	}
	@GetMapping("memberList")
	public String MemberList(@RequestParam Map<String,Object> pMap) {
		logger.info("memberList 호출");
		String temp = null;
		List<Map<String, Object>> mList = new ArrayList<>();
		Map<String, Object> rmap = new HashMap<>();
		mList = memberLogic.memberList(pMap);
		Gson g = new Gson();
		temp = g.toJson(mList);
		return temp;
	}
	@GetMapping("memberDelete")
	public String memberDelete(@RequestParam Map<String,Object> pMap) {
		logger.info("memberDelete 호출");
		logger.info("memberDelete");
		logger.info(pMap.toString());
		int result=0;
		result=memberLogic.memberDelete(pMap);
		logger.info(result);
		return String.valueOf(result);
	}
}
