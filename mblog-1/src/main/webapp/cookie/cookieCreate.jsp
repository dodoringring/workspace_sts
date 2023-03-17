<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>쿠키생성하기</title>
</head>
<body>
<%
//아래 코드는 서버가 바라보는 물리적인 위치에 들어있다.
//서버츳에서 실행됨->html->다운로드(SSR-서버사이드렌더링)->동적처리(실시간)->서버사이드의 장애
 	Cookie c1=new Cookie("notebook", "맥북");
	c1.setMaxAge(60*5);//시간 60초*분
	Cookie c2=new Cookie("hp", "아이폰");
	c2.setMaxAge(60*2);
	//아래를 생략하면 현재 페이지가 바라보는 물리적인 위치를 갖는다.
	//여기서는 쿠키임
	c2.setPath("/");
	Cookie c3=new Cookie("coffee", "아메리카노");
	c3.setMaxAge(60*3);
	response.addCookie(c1);
	response.addCookie(c2);
	response.addCookie(c3); 
%>
</body>
</html>