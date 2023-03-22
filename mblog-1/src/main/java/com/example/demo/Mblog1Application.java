package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration //빈태그쓸때 컨피그레이션 반드시 있어야한다.
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
         //포트 번호는 여기에서 바꿔 줄 것
            	registry.addMapping("/**").allowedOrigins("http://localhost:3000");
}
};
}

}
