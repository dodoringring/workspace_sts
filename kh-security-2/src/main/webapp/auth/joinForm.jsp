<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
<script type="text/javascript">
	function memberInsert(){
		document.getElementById("f_user").submit();
	}
</script>
</head>
<body>
<form id="f_user" method="post" action="/join">
	이   름 : <input type="text" id="username" name="username"><br>
	비   번 : <input type="text" id="password" name="password"><br>
	이 메 일 : <input type="text" id="email" name="email" value="test@hot.com"><br>
	<button onClick="memberInsert()">가입</button>
</form>
</body>
</html>