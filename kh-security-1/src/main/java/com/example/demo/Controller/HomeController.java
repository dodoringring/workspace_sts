package com.example.demo.Controller;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.SecurityMessage;

@RestController
public class HomeController {
	Logger logger=LogManager.getLogger(HomeController.class);
	
	@GetMapping("/")
	public String index() {
		logger.info("index");
		return "홈페이지";
	}
	@GetMapping("/auth")
	public Authentication auth() {
		return SecurityContextHolder.getContext().getAuthentication();
	}
	@PreAuthorize("hasAnyAuthority('ROLE_USER')")
	@GetMapping("/user")
	public SecurityMessage.builder()
				.auth(SecurityContextHolder.getContext().getAuthentication())
				.message("user정보")
				.build();
}
	@PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
	@GetMapping("/user")
	public SecurityMessage.builder()
				.auth(SecurityContextHolder.getContext().getAuthentication())
				.message("Admin정보")
				.build();
	}
