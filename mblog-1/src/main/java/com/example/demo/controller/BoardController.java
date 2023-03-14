package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.logic.BoardLogic;


@Controller//컨트롤러라고 알려주는. step3에서 컨트롤러를 오버라이드 한것 대신 어노테이션.
@RequestMapping("/board/*")
public class BoardController {
	Logger logger=LoggerFactory.getLogger(BoardController.class);
	@Autowired
	private BoardLogic boardLogic=null;
	@GetMapping("boardList")
	public String boardList(Model model, @RequestParam Map<String, Object> pMap){//알아서 맵에 담아줌 리쿼스트없이
		System.out.println("boardList호출");
		logger.info("boardList 호출");
		logger.info(pMap.toString());
	
		List<Map<String, Object>> bList =null;
		bList=boardLogic.boardList(pMap);
		model.addAttribute("bList",bList);
//		return "forward:boardList.jsp";
		return "board/boardList";
	}
}