package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.logic.MemberLogic;
import com.google.gson.Gson;

@RestController
@RequestMapping("/member/*")
public class RestMemberController {
//	Logger log = LoggerFactory.getLogger(RestMemberController.class);
	Logger log = LogManager.getLogger(RestMemberController.class);
	
	
	@Autowired
	private MemberLogic ml = null;
	
	@PostMapping("memberInsert")
	public String memberInsert (@RequestBody Map<String, Object> pmap) {//리액트에서 body에 {}로 넘어와도 VO가 아니어도
		log.info("memberInsert called => " + pmap);
		int result = 0;
		result = ml.memberInsert(pmap);
		return String.valueOf(result);
	}
	
	@PostMapping("memberUpdate")
	public String memberUpdate (@RequestBody Map<String, Object> pmap) {
		log.info("memberUpdate called => " + pmap);
		int result = 0;
		result = ml.memberUpdate(pmap);
		return String.valueOf(result);
	}
	
	@GetMapping("memberDelete")
	public String memberDelete (@RequestParam Map<String, Object> pmap) {
		log.info("memberDelete called => " + pmap);
		int result = 0;
		result = ml.memberDelete(pmap);
		return String.valueOf(result);
	}
	
	//localhost:8000/member/memberList
	//리액트 프로젝트에서 닉네임 중복검사시 사용하는 메소드 구현입니다
	//리액트에서 넘기는 파라미터는 { MEM_NICKNAME: memInfo[key], type: 'overlap' }
	//RESTController의 경우 문자열도 바로 출력 가능함. rest가 아닌 컨트롤러는 화면으로 연결됨.
	@GetMapping("memberList")
	public String jsonMemberList (@RequestParam Map<String, Object> pmap) {
		log.info("memberList called ===>" + pmap);
		String temp = null;
		List<Map<String, Object>> mList = new ArrayList<>();//mlist.size() = 0
		mList = ml.memberList(pmap);
		//파라미터로 넘어온 키위가 회원 집합에 존재하면 조회결과가 있다 => mList.size() == 1 or 0
		if(mList.size() > 0) {
			Gson g = new Gson();
			temp = g.toJson(mList);			
			log.info("temp ==> " + temp);
		}
		//mem_uid가 없을 때 - 회원가입 유도할 것
		else {
			temp = "0";
			log.info("temp ==> " + temp);
		}
		return temp;
	}
}
