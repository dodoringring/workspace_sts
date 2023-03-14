package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

//webServlet => Controller+RequestMapping
@Controller
@RequestMapping("/home/*")
public class HomeController {
	//테스트 URL경로 : http://localhost:8000/home/index
	@GetMapping("index")
	public String home() {
		return "home/index";
	}
}
