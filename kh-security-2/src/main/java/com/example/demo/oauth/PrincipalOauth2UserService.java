package com.example.demo.oauth;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.example.demo.auth.PrincipalDetails;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
/*
 * 구글 로그인 버튼 클릭 -> 구글 로그인창 -> 로그인을 완료 -> 코드를 리턴(OAuth2-Client라이브러리 받음)
 * AccessToken요청 (UserRequest정보)->loadUser호출->구글로부터 회원 프로필을 받음
 * super.loadUSer(userRequest).getAttributes():Map<Stirng, Object> 구글계정있으면 자동 회원가입 가능
 * */
@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
	//상속을 받았다는 건 제약사항이 생긴다는 의미... 오버라이딩을 해야할수도..
	//그냥 바로 source -> override method로 추가해주자!

	Logger log = LogManager.getLogger(PrincipalOauth2UserService.class);
	
	@Autowired
	private UserRepository userRepository;
	//구글로부터 받은 user에 대한 request 데이터에 대한 후처리 메소드 구현 - Profile정보 수집
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		log.info("userRequest: " + userRequest);
		//엑세스 토큰 출력해보기
		log.info("벤더정보 : " +userRequest.getClientRegistration().getRegistrationId());
		log.info("구글에서 발급하는 토큰값 : " + userRequest.getAccessToken().getTokenValue());
		log.info("구글에서 발급하는 ID값 : " + userRequest.getClientRegistration().getRegistrationId());
		log.info("구글에서 발급하믄 Client값 : "+userRequest.getClientRegistration().getClientId());
		//구글 인증 후 프로필 정보를 가져와서 OAuth2User에 담기
		OAuth2User oauth2User=super.loadUser(userRequest);
		log.info(oauth2User.getAttribute("sub").toString());//
		log.info(oauth2User.getAttribute("email").toString());//
		String vender = userRequest.getClientRegistration().getRegistrationId();
		String sub=oauth2User.getAttribute("sub").toString();
		String username=vender+"_"+sub;
		String password="123";
		String email=oauth2User.getAttribute("email").toString();
		String role="ROLE_USER";
		//구글 프로필을 가지고 회원가입 전에 이미 되어있는지 체크
		User userEntity = userRepository.findByUsername(username);
		if(userEntity==null) {//username이 없니?
			log.info("회원가입 이력 없음");
			userEntity = new User(username, password, email, role, null);
		//내가 롬복이 안되어서...
//			userEntity=
//					User.builder()
//					.username(username)
//					.password(password)
//					.email(email)
//					.role(role)
//					.build();
			userRepository.save(userEntity);
		}else {
			log.info("구글 계정으로 회원가입이 되어 있습니다.");
		}
		return new PrincipalDetails(userEntity, oauth2User.getAttributes());
	 }
	}
	
