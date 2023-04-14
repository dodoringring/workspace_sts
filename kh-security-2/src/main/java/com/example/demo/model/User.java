package com.example.demo.model;


import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Builder;
import lombok.Data;

@Entity // jpa사용시 테이블 생성해줌 - 확인할것. application.yml에 create모드인지 체크
@Data // getter, setter생성해줌
public class User {
	@Id // primary key
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Timestamp getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}
	private String username;
	private String password;
	private String email;
	private String role; // ROLE_USER, ROLE_MANAGER, ROLE_ADMIN
	@CreationTimestamp
	private Timestamp createDate;
	// 회원가입에 사용할 생성자 추가
	//파라미터가 있는 생성자가 하나라도 있으면 디폴트생성자를 추가 해줘야 한다.
	//디폴트생성자에 @Builder붙이면 망하면 이유는 들고 온 정보를 모두 초기화 해버림
	public User() {}
	//밑에 생성자가 디비에서 가져온 정보를 담는다.
	//UserRepository의 findByUsername으로 찾아낸 정보가 담김. 정보로 초기화가 됨.
	@Builder
	public User(String username, String password, String email
			, String role, Timestamp createDate) {
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.createDate = createDate;
	}
}