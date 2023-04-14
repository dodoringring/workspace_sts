package com.example.demo.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Builder;
import lombok.Data;

@Entity //JPA사용시 테이블 생성해줌 - 확인할것. application.yml에 create모드인지 체크
@Data //getter, setter
public class User {
	@Id //primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	private String role; //ROLE_USER, ROLE_MANAGER, ROLE_ADMIN
	@CreationTimestamp //jpa에서는 쿼리문을 사용하지 않는다.
	private Timestamp createDate;
	//회원가입에 사용할 생성자 추가
	@Builder
	public User(String username, String password, String email, String role, Timestamp createDate) {
		this.username=username;
		this.password=password;
		this.email=email;
		this.role=role;
		this.createDate=createDate;
	}
}
