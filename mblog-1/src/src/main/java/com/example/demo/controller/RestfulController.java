package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	Logger log = LoggerFactory.getLogger(RestfulController.class);
	
	//http://localhost:8000/restful/5
	@GetMapping("{id}")
	public String main(@PathVariable int id) {
		log.info("해시값 받아주는 어노테이션 : " + id);
		return String.valueOf(id);
	}
	
	//http://localhost:8000/restful/get?mem_id=lemon&mem_pw=1234&mem_name=요네즈
	@GetMapping("get")//upmu[1]
	public String getTest(MemberVO mvo) {
		log.info(mvo.toString());
		return "get 요청" + mvo.getMem_id() + ", " + mvo.getMem_name() + ", " + mvo.getMem_pw();
	}
	
	//postman에서 테스트해야만 하며 @RequestBody에 들어갈 값은 Body에 들어갈 값은 Body 선택 후 row체크하고 반드시 JSON형식 선택 후 JSON포맷으로 파라미터 넘겨야함 - 주의할 것
	//@RequestBody에 타입을 선언하면 MessageConveter가 대신 해줌 - 반드시 JSON포맷으로 넘길 것
	//Cloudinary와 관련있는 POST
	//리액트와 스프링 연동할 때 필요한 것들도 함께 적어줌
	@PostMapping("post")
	public String postTest(@RequestBody MemberVO mvo) {
		log.info(mvo.toString());
		return "post 요청 : " + mvo.getMem_id() + ", " + mvo.getMem_name() + ", " + mvo.getMem_pw();
	}
}
