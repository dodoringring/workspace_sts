package com.example.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.logic.BoardLogic;
import com.example.demo.logic.MemberLogic;
import com.google.gson.Gson;

@RestController
@RequestMapping("/member/*")
public class RestMemberController {
	Logger logger = LoggerFactory.getLogger(RestMemberController.class);
	
	@Autowired//자동으로 의존성을 주입
	private MemberLogic memberLogic = null;
	
	@GetMapping("jsonMemberList")
	public String jsonMemberList(Model model, @RequestParam Map<String,Object> pMap) {
		logger.info("jsonMemberList 호출");
		String temp = null;
		List<Map<String, Object>> mList = new ArrayList<>();
		Map<String, Object> rmap = new HashMap<>();
//		rmap.put("mem_id", "tomato");
//		rmap.put("mem_pw", "123");
//		rmap.put("mem_name", "토마토");
		mList = memberLogic.memberList(pMap);
		Gson g = new Gson();
		temp = g.toJson(mList);
		return temp;
	}
}
