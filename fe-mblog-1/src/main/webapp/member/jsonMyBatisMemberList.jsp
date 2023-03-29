<%--  <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>--%>
<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.util.*, java.util.*, com.google.gson.Gson" %>
<%@ page import="org.apache.ibatis.session.*" %>
<%
	MyBatisCommonFactory mcf = new MyBatisCommonFactory();
	List<Map<String, Object>> memList = null;
	SqlSessionFactory ssf = null;
	SqlSession ss = null;
	Map<String, Object> pmap = new HashMap<>();
	pmap.put("mem_num", 0);
	try {
		ssf = mcf.getSqlSessionFactory();
		ss = ssf.openSession();
		memList = ss.selectList("memberList", pmap);
	} catch (Exception e) {
		e.printStackTrace();
	}
	Gson g = new Gson();
	String temp = null;
	temp = g.toJson(memList);
	out.print(temp);
%>