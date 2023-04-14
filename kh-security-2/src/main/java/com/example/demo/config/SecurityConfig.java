package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.demo.oauth.PrincipalOauth2UserService;

//1-1에서는 SecurityConfig파일을 생성하지 않았다.
//스프링 시큐리티에서 제공하는 인증화면 -> LoginPageGeneratingFilter?? -> 필터를 경유하기 때문에 인터셉트 당함. 서블릿 도달하기 전에 필터를 먼저 거친다.
//이 클래스를 정의하지 않으면 스프링시큐리티가 제공하는 DefaultLoginPageGeneratingFilter
//이 필터가 제어권을 가져가서 개발자가 만든 로그인 화면을 만날 수 없다.
//결론 : 내가 주도하는 인증 처리를 위해서는 반드시 선언하자! 아무것도 안해도 얘가 있는 것만으로도 제어권을 빼앗아옴.
@EnableWebSecurity(debug=true) // 요청이 지나가는 필터정보 콘솔에서 확인 가능
@EnableGlobalMethodSecurity(securedEnabled=true, prePostEnabled=true) // 권한을 체크하겠다는 설정 추가
public class SecurityConfig {
	
	//암호화가 안된 비번으로는 로그인이 안됨
	//패스워드를 암호화하기 위한 코드 추가
	//Bean어노테이션을 적으면 해당 메소드의 리턴되는 오브젝트를 IoC로 등록 해줌
	@Bean
	public BCryptPasswordEncoder encodePwd() {
		return new BCryptPasswordEncoder();
	}
	
	@Autowired
	private PrincipalOauth2UserService principalOauth2UserService;
	
	//암호화가 안된 비밀번호로는 로그인이 안되게하는 의존성 주입.
	/*@Bean//bean 자체가 의존성 주입.
	PasswordEncoder passwordEncoder() {//패스워드 암호화
		return new BCryptPasswordEncoder();//주입이 되면 얘가 관여를 함. 노출되지 않도록 128비트로 암호화~~ 결국엔 풀 수 있겠지만 푸는 동안 보안 담당자들이 감지할 수 있도록 시간을 버는 용...
	}*/
	
	//만일 관리자 계정이면 하위인 유저 계정에(페이지에)도 접근할 수 있도록 처리하려면 아래를 추가함
	//유저는 관리자 페이지에 접근이 안되지만 관리자는 유저페이지도 가능하고 관리자 페이지도 접근가능하도록 설정
	@Bean
    RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        roleHierarchy.setHierarchy("ROLE_ADMIN > ROLE_USER");
        return roleHierarchy;
    }
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		AuthenticationManagerBuilder auth = 
				http.getSharedObject(AuthenticationManagerBuilder.class);
		/*auth.inMemoryAuthentication()
		// 아래 메소드가 데프리케이트 대상인 이유는 테스트용도로만 사용하라는 경고의 의미
		// 보안상 안전하지 않으니 쓰지말것을 당부 -  그러나 지원은 끊지 않음
		.withUser(User.withDefaultPasswordEncoder()
				.username("user")
				.password("123")
				.roles("USER")
		).withUser(User.withDefaultPasswordEncoder()
				.username("admin")
				.password("1234")
				.roles("ADMIN")
		);*/
		
		http.csrf().disable();//csrf filter 비활성화하기
		http.authorizeRequests()//http요청으로 들어오는 모든 것에 대해서 매칭하기 //요청에 대해 보안검사
		// localhost:5000/user로 요청하면 403발동 - 403접근권한이 없을때
		.antMatchers("/user/**").authenticated() // 인증만 되면 들어갈 수 있는 주소
		// manager나 admin 권한이 있는 사람만 접근가능
		.antMatchers("/manager/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")//클래스 위에서 securedEnabled=true 속성을 추가해야 권한에 대한 옵션을 제공받을 수 있음.
		// admin 권한이 있는 사람만 접근가능
		.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
		.anyRequest().permitAll() // 위 세가지가 아닌 경우는 모두 허용함
		.and()//새로운 옵션을 추가할 때
		.formLogin()
		.loginPage("/loginForm") // 2차 단위테스트 - 권한에 따라서 페이지 제어
		.loginProcessingUrl("/login")//이 URL이 요청되면 시큐리티가 인터셉트해서 대신 로그인 진행
		.failureUrl("/login-error")
		.defaultSuccessUrl("/")
		.and()
		//구글 로그인 기능 구현 추가분
		.oauth2Login()
		.loginPage("/loginForm")
		//구글 로그인 후 후처리가 필요함
		//1.인증 받기, 2.엑세스 토큰받아오기(권한), 3.사용자 프로필 정보 가져오기, 4.그 정보를 가지고 회원가입 처리할 수도 있다(이번엔 미적용)
		//구글 로그인이 성공하면 코드를 받는 게 아니라 엑세스 토큰과 사용자 프로필 정보를 한 번에 받아옴
		.userInfoEndpoint()
		.userService(principalOauth2UserService);//구글 로그인 후처리 클래스 추가
		//현재 페이지에서 로그아웃을 눌렀을 때 로그인 페이지가 아니라 메인페이지에 있도록 해줌
		//.logout(logout -> logout.logoutSuccessUrl("/"))//주석처리하면 로그인화면으로 이동하고 아니면 메인에 남아있는다.
		//403 접근제한 예외 발생시 이동할 페이지 요청 URL 작성하기
		//.exceptionHandling(exception -> exception.accessDeniedPage("/access-denied"));
		
		/* 필터들을 죽여보자! */
//		http
//		.headers().disable()
//		.csrf().disable()
//		.logout().disable()
//		.requestCache().disable();//죽었다!
		
		return http.build();
	}// end of filterChain
}


/*
	테스트 시나리오
	localhost:5000 요청은 권한과 상관없이 열림
	localhost:5000/user
	localhost:5000/admin
	localhost:5000/manager
	로그인 페이지로 이동함
	
	첫번째 - user롤일때
	localhost:5000/user 출력되고
	localhost:5000/admin 403발동
	localhost:5000/manager 403발동
	
	두번째 - admin 로그인했을때
	lcalhost:5000/user 출력
	localhost:5000/admin 출력
	localhost:5000/manager 출력
	
	두번째 - manager 로그인했을때
	lcalhost:5000/user 출력
	localhost:5000/admin 403발동
	localhost:5000/manager 출력
*/
