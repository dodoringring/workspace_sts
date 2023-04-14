package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.User;

//CRUD메소드는 JpaRepository가 제공함.
public interface UserRepository extends JpaRepository<User, Integer> {
	public User findByUsername(String username);
}
