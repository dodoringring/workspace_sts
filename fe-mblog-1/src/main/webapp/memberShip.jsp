<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    //스크립틀릿이라고 읽음
    String mem_id = request.getParameter("mem_id");
	out.print("사용자가 입력한 ID : " + mem_id);
	out.print("<br />");
	String mem_pw = request.getParameter("pw");
	out.print("사용자가 입력한 PW : " + mem_pw);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
</html>