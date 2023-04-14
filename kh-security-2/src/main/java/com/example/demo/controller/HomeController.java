package com.example.demo.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Controller
public class HomeController {
	Logger logger = LogManager.getLogger(HomeController.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@GetMapping({"", "/"})
	public String index(HttpServletRequest req) {
		logger.info("index");
		return "forward:/index.jsp";
		/*logger.info("admin 호출: " + req.isUserInRole("ROLE_ADMIN"));
		logger.info("user 호출: " + req.isUserInRole("ROLE_USER"));
		logger.info("manager 호출: " + req.isUserInRole("ROLE_MANAGER"));
		if(req.isUserInRole("ROLE_ADMIN")) {
			return "forward:admin-index.jsp";			
		}
		else if(req.isUserInRole("ROLE_USER")) {
			return "forward:user-index.jsp";			
		}
		else {
			return "forward:index.jsp";			
		}*/
	}
	
	@GetMapping("/test/oauth/login")
	public @ResponseBody String testOAuthLogin(Authentication authentication, @AuthenticationPrincipal OAuth2User oauth) {
		logger.info("authentication : " + authentication.getPrincipal());
		OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
		logger.info("authentication : " + oAuth2User.getAttributes());
		logger.info("oauth : " + oauth.getAttributes());
		return "구글 세션 정보 확인";
	}
	
	// 로그인 화면
	@GetMapping("/loginForm")
	public String loginForm() {
		logger.info("loginForm");
		return "redirect:/loginForm.jsp";
	}
	
	/*
	/login이 요청되면 스프링 시큐리티가 인터셉트해서 대신 로그인 진행해줌
	@GetMapping("/login")
	public @ResponseBody String login() {
		logger.info("login");
		return "로그인 후 페이지";
	}
	*/
	
	// 회원가입 화면 부르기
	@GetMapping("/joinForm")
	public String joinForm() {
		logger.info("joinForm");
		return "redirect:/joinForm.jsp";
	}
	
	// 회원가입
	@PostMapping("/join")
	public String join(User user) {
		logger.info("user");
		user.setRole("ROLE_USER");
		//패스워드 암호화 처리
		String rawPwd = user.getPassword();
		//NPE or Autowired(required=true).... 어쩌고 메세지 -> SecurityConfig 빈 등록을 안했을 때... 그거 확인 그래야 아래에서 객체주입이 되어서 암호화
		String encPwd = bCryptPasswordEncoder.encode(rawPwd);
		user.setPassword(encPwd);
		userRepository.save(user);
		return "redirect:/loginForm.jsp";
	}
	
	//index.jsp에 링크가 걸린 페이지를 보고 mapping값을 적어줌
	@GetMapping("/login-error")
	public String loginError() {
		logger.info("loginError");
		return "redirect:/loginError.jsp";
	}
	
	@GetMapping("/access-denied")
	public String accessDenied() {
		logger.info("accessDenied");
		return "redirect:/accessDenied.jsp";
	}
	
	//@PreAuthorize를 사용하려면 반드시
	//@EnableGlobalMethodSecurity(securedEnabled=true, prePostEnabled=true)를 추가해야함
	//이때 첫번째 파라미터는 ROLE에 따른 접근 제약을 활성화해주는 파라미터
	//두번째 파라미터는 해당 메소드에 ROLE을 부여할 때 추가할 것
	//prePostEnabled=true를 꼭 추가해주자!
	@PreAuthorize("hasAnyAuthority('ROLE_USER')")
	@GetMapping("/user")
	public String user() {
		logger.info("user");
		return "forward:/user-index.jsp";
	}
	
	@GetMapping("/manager")
	public @ResponseBody String manager() {
		logger.info("manager");
		return "manager";
	}
	
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@GetMapping("/admin")
	public String admin() {
		logger.info("admin");
		return "forward:/admin-index.jsp";
	}
	
	@GetMapping("/auth")
	public @ResponseBody Authentication auth() {
		return SecurityContextHolder.getContext().getAuthentication();
	}
}

/*
 * 1. 스프링 시큐리티가 관리하는 세션이 따로 존재한다
 * 2. 테스트 시나리오 
 * 	  => localhost:5000/test/login 엔터
 *    파라미터인 Authentication은 스프링 시큐리티로부터 의존성 주입받음
 *    스프링 시큐리티는 스프링 시큐리티의 세션을 들고 있다 -> 서버 세션 영역에 시큐리티가 관리하는 세션이 따로 존재 //일반적으로 사용하는 세션과는 다르다
 *    시큐리티 세션은 반드시 Authentication객체만 들어갈 수 있다
 *    Authentication이 시큐리티 세션 안에 있다는 건 로그인된 상태라는 의미
 *    
 */

