<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>쿠키 삭제하기</title>
</head>
<body>
<%
	Cookie cookie=new Cookie("notebook","");
	cookie.setMaxAge(0);
	response.addCookie(cookie);
%>
</body>
</html>