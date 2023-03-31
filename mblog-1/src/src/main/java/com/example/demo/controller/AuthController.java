package com.example.demo.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import com.example.demo.model.KakaoProfile;
import com.example.demo.model.OAuthToken;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("/auth/*")
public class AuthController {
	Logger log = LoggerFactory.getLogger(AuthController.class);
	
	//카카오 Redirect_url 등록된 값으로 맞춤.
	@GetMapping("/kakao/callback")//여기 들어올 값은 callback의 url
	public String kakaoCallback(HttpSession session, String code){
		log.info("kakaoCallback");
		
		// POST방식으로 key=value 데이터를 요청 (카카오쪽으로)
		// 이것을 위해 RestTemplate라이브러리가 있음
		RestTemplate rt = new RestTemplate();
		// HttpHeaders 객체 생성
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", "b3e896a3ff7e1e4900774564a1a6028c");
		params.add("redirect_uri", "http://localhost:8000/auth/kakao/callback");
		params.add("code", code);
		// HttpHeader와 HttpBody를 하나의 오브젝트에 담기
		HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, headers);
		// Http요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음
		ResponseEntity<String> response = rt.exchange("https://kauth.kakao.com/oauth/token", HttpMethod.POST,
				tokenRequest, String.class);
		
		log.info(code);
		log.info(response.getBody());
		
		ObjectMapper objectMapper = new ObjectMapper();
		OAuthToken oAuthToken = null;
		try {
			oAuthToken = objectMapper.readValue(response.getBody(), OAuthToken.class);
		} catch (JsonMappingException jme) {
			jme.printStackTrace();
		} catch (JsonProcessingException je) {
			je.printStackTrace();
		}
		log.info(oAuthToken.toString());
		log.info("access_token ==> " + oAuthToken.getAccess_token());

		// 사용자 정보 가져오기

		RestTemplate rtUser = new RestTemplate();
		// HttpHeaders 객체 생성
		HttpHeaders headers2 = new HttpHeaders();
		headers2.add("Authorization", "Bearer " + oAuthToken.getAccess_token());
		headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		// HttpHeader와 HttpBody를 하나의 오브젝트에 담기
		HttpEntity<MultiValueMap<String, String>> profileRequest = new HttpEntity<>(headers2);
		// Http요청하기 - Post방식으로 - 그리고 response 변수의 응답 받음
		ResponseEntity<String> response2 = rtUser.exchange("https://kapi.kakao.com/v2/user/me", HttpMethod.POST,
				profileRequest, String.class);
		System.out.println(response2.getBody());

		ObjectMapper objectMapper2 = new ObjectMapper();
		KakaoProfile kakaoProfile = null;
		try {
			kakaoProfile = objectMapper2.readValue(response2.getBody(), KakaoProfile.class);
		} catch (JsonMappingException jme) {
			jme.printStackTrace();
		} catch (JsonProcessingException je) {
			je.printStackTrace();
		}
		// User : username, password, email
		log.info("카카오 아이디(번호) : " + kakaoProfile.getId());
		log.info("카카오 이메일 : " + kakaoProfile.getKakao_account().getEmail());
		log.info("카카오 유저네임 : " + kakaoProfile.getProperties().nickname);
		String nickname = kakaoProfile.getProperties().nickname;
		session.setAttribute("nickname", nickname);
		return "redirect:/";
	}
}
