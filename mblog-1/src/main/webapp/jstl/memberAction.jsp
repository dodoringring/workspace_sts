<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import ="java.util.List, java.util.Map" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<!-- JSTL core 태그를 사용하기 위한 taglib 지시 -->
<%

//jstl/memberAction.jsp요청하면->7번 redirect만나고
//MemberController(GetMapping("jsonMemberList"))-MemberLogic
//MemberDao->@Configuration->DatabaseConfiguration->@Bean(글로벌)
//Bean은 글로벌하게 모든 클래스 다 주입해줌. Autowired는 그 컨트롤러 클래스 안에서만 주입가능
//model.addOnject("mList", mList);
//List<Map<String, Object>> mList=(List<Map<String, Object>>)request.getAttribute("mList");
//response.sendRedirect("/member/jsonMemberList");
	//response.sendRedirect("/member/jsonMemberList?mem_id=tomato");
	//편하게 forEach문을 사용 할 수 있다.
	//test시나리오
	//localhost:8000/member/memberList
%>
<c:forEach var="map" items="${mList}" varStatus="x">
	${mList[x.index]}
</c:forEach>