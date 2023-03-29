package com.example.demo.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.logic.MemberLogic;

@Controller
@RequestMapping("/mem/*")
public class MemberController {
	Logger log = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private MemberLogic ml = null;
	
	@GetMapping("memberInsert")
	public String memberInsert(@RequestParam Map<String, Object> pmap) {
		log.info("memberInsert called");
		log.info(pmap.toString());
		int result = 0;//1이면 가입 성공, 0이면 실패
		result = ml.memberInsert(pmap);
		return "redirect:./memberList";
	}
	
	@GetMapping("memberList")
	public String memberList(Model model) {//전달할 게 있을 때는 Model로
		log.info("memberList called");
		return "member/memberList";
	}
}
