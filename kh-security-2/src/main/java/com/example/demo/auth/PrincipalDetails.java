package com.example.demo.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import com.example.demo.model.User;
import lombok.Data;

/*
 * Authentication을 제공하는 인증제공자는 여러 개가 동시에 존재할 수 있고
 * 인증 방식에 따라 ProviderManager도 복수로 존재할 수 있음
 * Authentication은 인터페이스로 아래와 같은 정보를 들고 있음
 * Set<GrantedAuthority> authorities : 인증된 권한 정보
 * principal : 인증 대상에 관한 정보로 UserDetails 타입이 옴
 * credentials : 인증 확인을 위한 정보 주로 비번이 오지만 인증 후에는 보안을 위해 삭제함
 * details : 그 밖에 정보 IP, 세션 정보, 기타 인증 요청에서 사용했던 정보들
 * UserDetails와는 다른 정보를 가짐
 * boolean authenticated : 인증이 되었는지를 체크함
 * 
 * 필터들 중 일부 필터는 인증 정보에 관여함
 * 필터가 하는 역할은 AuthenticationManager를 통해 Authentication을 인증하고
 * 그 결과를 SecurityContextHolder에 넣어주는 일을 한다.
 * SecurityContextHolder는 인증 보관함 보관소이다
 * 
 * AuthenticationManager가 인증관리자인데
 * 이것의 구현체 클래스가 ProviderManager이고 이 클래스는 여러개 사용이 가능하다는 설명임
 * 
 * 인증 토큰(Authentication)을 제공하는 필터들
 * :Authentication은 인터페이스이고 이것의 구현체 클래스들이 접미어에 Token이라는 이름을
 * 사용하고 있으니 인증토큰이라고 해도 되지 않을까요? //사견
 * 폼 로그인
 * UsernamePasswordAuthenticationFilter -> UsernamePasswordAuthenticationToken
 * AnonymousAuthenticationFilter : 로그인을 하지 않았다는 인증 -> AnonymousAuthenticationToken
 * SecurityContextPersistenceFilter : 기존 로그인을 유지함(기본적으로 session을 이용함)
 * OAuth2LoginAuthenticationFilter : 소셜 로그인 OAuth2LoginAuthenticationFilterToken
 */
@Data
public class PrincipalDetails implements UserDetails, OAuth2User{ //오버라이드 해줌-구현체클래스있어야
	Logger logger = LogManager.getLogger(PrincipalDetails.class);
	private User user; //콤포지션
	//구글 로그인시 구글서버에서 넣어주는 정보가 Map의 형태인데 그것을 받을 Map변수 선언하는 것임
	private Map<String,Object> attributes;
	
	//일반로그인시 사용하는 생성자
	public PrincipalDetails(User user) {
		this.user = user;
	}
	
	//OAuth로그인시 사용하는 생성자임
	//그런데 어떻게 User정보를 갖게 되냐면 attributes를 통해서 User를 생성해 준다
	public PrincipalDetails(User user, Map<String,Object> attributes) {
		this.user = user;
		this.attributes = attributes;
	}
	
	//해당 User의 권한을 리턴하는 곳
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collect = new ArrayList<>();
		collect.add(new GrantedAuthority() {
			@Override
			public String getAuthority() {
				return user.getRole();
			}
		});
		return collect;
	}
	
	//아래 정보들이 데이터베이스 쪽과 매칭이 안되면 loginFail.jsp페이지 호출됨
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}
	
	//세션에 담을 다른 컬럼 정보도 추가 가능함
	public int getId() {
		return user.getId();
	}

	@Override
	public boolean isAccountNonExpired() {
		//계정이 파괴되지 않았니? 네
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		//계정이 잠겨 있는지 유무 체크함
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		//계정 사용 기간이 지났는지, 비번을 너무 오래 사용한거 아닌지 물어보는 것임
		return true;
	}
	
	//네 계정이 활성화 되어 있니? 물어보는 거임
	@Override
	public boolean isEnabled() {
	//그럼 이걸 언제 false하면 되는 건가? 만일 1년 동안 회원이 로그인을 안하면
	//휴면 계정으로 처리하기
		return true;
	}
	
	//구글 로그인 요청 후 콜백 URL을 통해서 개인 프로필 정보를 Map에 담아주는 메소드를 재정의했음
	@Override
	public Map<String, Object> getAttributes() {
		logger.info("getAttributes");
		return attributes;
	}
	
	//개인 프로필 정보가 getAttributes에서 Map에 담아주니까 아래 메소드는 사용값이 없는 경우로 리턴을 null로 처리함
	@Override
	public String getName() {
		logger.info("getName");
		//return attributes.get("sub").toString();//이러면 되는데 사용하는 값이 아니므로 null로 함
		return null;
	}

}
