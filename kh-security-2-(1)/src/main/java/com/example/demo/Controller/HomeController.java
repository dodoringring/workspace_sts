package com.example.demo.Controller;


import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

//@RestController//무조건 스트링으로 빠진다.
@Controller
public class HomeController {
	Logger logger=LogManager.getLogger(HomeController.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/")
	public String index(HttpServletRequest req) {
		logger.info("index");
		logger.info("admin호출 : "+req.isUserInRole("ROLE_ADMIN"));
		logger.info("user호출"+req.isUserInRole("ROLE_USER"));
		logger.info("manager호출 : "+req.isUserInRole("ROLE_MANAGER"));
		if(req.isUserInRole("ROLE_ADMIN")) {
			return "forward:admin-index.jsp";
		}
		else if(req.isUserInRole("ROLE_USER")) {
			return "forward:user-index.jsp";
		}
		else {
			return "forward:index.jsp";
		}
	}
	
	
	@GetMapping("/loginForm")
	public String loginForm() {
		return "redirect:/auth/loginForm.jsp";
	}
	/*
	 * login이 요청되면 스프링 시큐리티가 인터셉트해서 대신 로그인을 진행해줌
	@GetMapping("/login")
	public @ResponseBody String login(){
		return "로그인 한 후 페이지";
	}
	*/
	
	@GetMapping("/joinForm")
	public String joinForm() {
		return "redirect:/auth/joinForm.jsp";
	}
	@PostMapping("/join")
	public String join(User user) {
		user.setRole("ROLE_USER");
		userRepository.save(user);
		return "redirect:/auth/loginForm.jsp";
	}
	
	@GetMapping("/user")
	public @ResponseBody String user() {
		logger.info("user");
		return "user";
	}
	@GetMapping("/admin")
	public @ResponseBody String admin() {
		logger.info("admin");
		return "admin";
	}
	@GetMapping("/manager")
	public @ResponseBody String manager() {
		logger.info("manager");
		return "manager";
	}
	
	@GetMapping("/auth")
	public @ResponseBody Authentication auth() {
		return SecurityContextHolder.getContext().getAuthentication();
	}
}
