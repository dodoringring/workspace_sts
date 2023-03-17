<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>EL표현언어 실습</title>
</head>
<body>
쿠키이름 : ${cookie.notebook.name}${cookie.hp.name}${cookie.coffee.name}
쿠키값 : ${cookie.notebook.value},${cookie.hp.value},${cookie.coffee.value}
</body>
</html>