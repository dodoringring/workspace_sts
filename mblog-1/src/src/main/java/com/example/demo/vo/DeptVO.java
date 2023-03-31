package com.example.demo.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data //getter와 setter 역할 대신하는 어노테이션
@NoArgsConstructor //생성자 생성 역할 어노테이션
@AllArgsConstructor
@Builder
public class DeptVO {
	private int deptno;
	private String dname;
	private String loc;
	private String filename;
	private String fileurl;
}
