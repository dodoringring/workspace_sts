<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%
	Cookie cs[]=request.getCookies();
int size=0;
size=cs.length;
for(int i=0;i<size;i++){
	out.print(cs[i].getName()+","+cs[i].getValue());
}
%>
</body>
</html>