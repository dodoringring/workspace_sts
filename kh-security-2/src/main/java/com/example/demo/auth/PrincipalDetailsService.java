package com.example.demo.auth;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class PrincipalDetailsService implements UserDetailsService {
	Logger log = LogManager.getLogger(PrincipalDetailsService.class);

	@Autowired
	private UserRepository userRepository;
	
	//아래 파라미터 username은 화면에서 사용하는 즉 input type의 name과 반드시 일치
	// -> /login 요청되면 시큐리티 인터셉트해서 자동으로 진행되는 부분
	//만일 다르게 하려면 SecurityConfig에서 .usernameParameter("mem_name")추가할 것 //mem_name 컬럼 살리려면 얘를 추가해줄것
	//loadUserByUsername메소드의 리턴은 어디로 가는가?
	//시큐리티 session(Authentication(내부의 UserDetails))로 담아줘야한다고...//무조건 userDetail타입이어야 담긴다고...
	//메소드 종료시 @AuthenticationPrincipal 어노테이션 생성됨
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info(username);//사용자가 입력한 이름
		//JPA query method로 검색하기 - mysql
		//User타입은 Authentication에 직접 담을 수 없음
		User userEntity = userRepository.findByUsername(username);//검색하기
		log.info(userEntity);//사용자가 입력한 이름
		log.info(userEntity.getRole());
		if(userEntity != null) {//DB에서 찾아온 정보를 들고 있으면 
			return new PrincipalDetails(userEntity);//Authentication에 담을 수 있는 타입으로 변환-인터페이스는 반드시 구현체 클래스가 있어야한다.
		}
		return null;
	}

}
