
package com.example.demo.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.vo.MemberVO;

@RestController
@RequestMapping("/restful/*")//upmu[0]
public class RestfulController {
	Logger logger=LoggerFactory.getLogger(RestfulController.class);
	//http://localhost:8000/restful/5
	@GetMapping("{id}")
	public String naim(@PathVariable int id) {
		logger.info("해시값 받아주는 어노테이션"+id);
		return String.valueOf(id);
	}
	
	
	@GetMapping("get")//upmu[1]
	public String getTest(MemberVO mVO) {
		logger.info(mVO.toString());
		return "get요청"+mVO.getMem_id()+", "+mVO.getMem_pw()+", "+mVO.getMem_name();
	}
	//postman에서 테스트 해야만 하며 @RequestBody에 들어갈 값은 Body선택 후 
	//row체크하고 반드시 JSON선택 후 Json포맷으로 파라미터 넘겨야함- 주의할 것
	//@RequestBody타입을 선언하면 MessageConverter가 대신 해줌 - 반드시 json포맷으로 넘길것
	//http://localhost:8000/restful/post
	@PostMapping("post")
	public String postTest(@RequestBody MemberVO mVO) {//post에서만 RequestBody 를 쓴다.
		logger.info(mVO.toString());
		return "post요청 : "+mVO.getMem_id()+","+mVO.getMem_pw()+","+mVO.getMem_name();
	}
	
}
