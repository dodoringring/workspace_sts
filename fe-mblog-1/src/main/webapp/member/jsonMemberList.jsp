<%--  <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>--%>
<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%><!-- 출력하는 데이터 타입 변경 가능 -->
<%@ page import="java.sql.*, java.util.*, com.util.DBConnectionMgr, com.google.gson.Gson" %>


<%
	//스크립틀릿
	//out.print("jsonMemberList페이지");
	DBConnectionMgr mgr = new DBConnectionMgr();
	Connection con = null;
	PreparedStatement pst = null;
	ResultSet rs = null;

	List<Map<String, Object>> memList = null;
	StringBuilder sql = new StringBuilder();
	sql.append("SELECT mem_num, mem_id, mem_name FROM MEMBER");//; 절대 안됨~~~
	try {
		//물리적으로 떨어져있는 오라클 서버에 연결 통로 확보
		con = mgr.getConnection();
		//연결 통로를 통해서 SELECT문을 가져가고 오라클 서버에게 요청하는 객체로딩
		pst = con.prepareStatement(sql.toString());
		//오라클 서버의 커서를 조작할 객체 로딩
		rs = pst.executeQuery();
		memList = new ArrayList<>();
		Map<String, Object> rmap = null;
		while(rs.next()) {
			rmap = new HashMap<>();
			rmap.put("mem_num", rs.getInt("mem_num"));
			rmap.put("mem_id", rs.getString("mem_id"));
			rmap.put("mem_name", rs.getString("mem_name"));
			memList.add(rmap);
		}
	//	System.out.println(memList);
	} catch (Exception e) {
		e.printStackTrace();
	} finally {
		//사용한 자원을 반납하기 - 명시적으로 반납할 것 - 실행 시점을 당기기 위해 - 튜닝팀의 권장 사항
		mgr.freeConnection(con, pst, rs);
	}
	Gson g = new Gson();
	String temp = null;
	temp = g.toJson(memList);
	out.print(temp);
%>