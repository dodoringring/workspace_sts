package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
//컨크롤 계층을 의미하는 어노테이션 추가-> request와 response를 누림
//단순히 bean을 관리받는다는 점 외에도 요청객체와 응답객체를 주입 받을 수 있음


@Controller
//web.xml대신 자바코드에 직접 추가 가능함-전체적인 빈목록을 볼 수 없음. 오타 절대 안된다. xml은 민감함
@RequestMapping("/home/*")//URL-pattern에 등록했던 URL주소 값으로 추가함
public class Homecontroller {
	//테스트 URL경로 : http://localhost:7000/home/index
		@GetMapping("index")
		public String home() {
			return "home/index";
		}
}