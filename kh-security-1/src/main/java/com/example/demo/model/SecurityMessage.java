package com.example.demo.model;

import org.springframework.security.core.Authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor //디폴트생성자
@Builder
public class SecurityMessage {
	private Authentication auth;
	private String message;
}
