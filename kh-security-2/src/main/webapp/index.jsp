<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>시작페이지</title>
   <link rel="stylesheet" href="/css/bootstrap.css">
   <link rel="stylesheet" href="/css/index.css">
</head>
<body>
<div class="container center-contents">
    <div class="row">
        <h1 class="title display-5"> 메인 페이지 </h1>
    </div>
    <div class="links">      
        <div class="link">
            <a href="/loginForm">  로그인 </a>
        </div>    
        <div class="link">
            <a href="/login-error">  로그인 에러  </a>
        </div>
        <div class="link">
            <a href="/access-denied" >  접근 에러  </a>
        </div>
        <div class="link">
            <a href="/user">  유저 페이지  </a>
        </div>
        <div class="link">
            <a href="/admin">  관리자 페이지 </a>
        </div>       
        <div class="link">
            <a href="/logout">로그아웃</a>
        </div>   
    </div>
</div>
</body>
</html>