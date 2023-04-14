package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@SpringBootApplication
public class Mblog1Application {

	public static void main(String[] args) {
		SpringApplication.run(Mblog1Application.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				//포트 번호는 여기에서 바꿔줄 것.
				//결과적으로 3000번은 개발서버로 7000은 서비스 서버로 사용하면 될것이다.
				registry.addMapping("/**").allowedOrigins("http://localhost:3000","http://localhost:7000");
			}
		};
	}

}
