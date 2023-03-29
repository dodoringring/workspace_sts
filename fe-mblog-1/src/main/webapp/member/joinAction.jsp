<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	//반드시 스크립틀릿 선언하고 사용 - 자바 영역
	//<input type="text" name="mem_id">
	String mem_id = request.getParameter("mem_id");//여기에 사용되는 속성이 name이다. 중요**
	out.print("사용자가 입력한 아이디 : " + mem_id);//이것은 로컬이 아니라 브라우저에 출력됨(다른 점 - 여기의 자바는 서블릿임~Servlet) => 서블릿이기 때문에 통신이 가능하고 Http방식을 이용한 소통이 가능
	
	String mem_pw = request.getParameter("mem_pw");
	out.print("비번은 : " + mem_pw);

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