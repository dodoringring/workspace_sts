package com.example.demo.vo;

import org.slf4j.LoggerFactory;

import lombok.Builder;
import lombok.Data;

import org.slf4j.Logger;

@Data //getter setter자동
@Builder//생성자 역할 어노테이션
public class DeptVO {
	private int deptno;
	private String dname;
	private String loc;
	private String filename;
	private String fileurl;
	

	public int getDeptno() {
		return deptno;
	}
	public void setDeptno(int deptno) {
		this.deptno = deptno;
	}
	public String getDname() {
		return dname;
	}
	public void setDname(String dname) {
		this.dname = dname;
	}
	public String getLoc() {
		return loc;
	}
	public void setLoc(String loc) {
		this.loc = loc;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getFileurl() {
		return fileurl;
	}
	public void setFileurl(String fileurl) {
		this.fileurl = fileurl;
	}
	
}
