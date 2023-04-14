<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>로그인 페이지</title>
<script>
	const login = (event) => {
		alert("로그인 호출");
		document.getElementById("f_login").submit();
	}
</script>
</head>
<body>
<h1>로그인 페이지</h1>
<!-- 아래 action은 개발자가 처리하는 것이 아니다 -->
<form id="f_login" action="/login" method="post">
	<input type="text" name="username" placeholder="Username" /><br>
	<input type="password" name="password" placeholder="Password" /><br>
	<button type="button" onclick="login()">로그인</button>
</form>
<a href="/joinForm.jsp">회원가입</a>
<a href="/oauth2/authorization/google">구글 로그인</a><!-- google developer console에서 콜백으로 지정했던 URI에서 뒷부분 떼고 붙여주기 -->
</body>
</html>