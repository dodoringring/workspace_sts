<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%@ page import ="java.util.List, java.util.Map" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core"%>
<!-- JSTL core �±׸� ����ϱ� ���� taglib ���� -->
<%

//jstl/memberAction.jsp��û�ϸ�->7�� redirect������
//MemberController(GetMapping("jsonMemberList"))-MemberLogic
//MemberDao->@Configuration->DatabaseConfiguration->@Bean(�۷ι�)
//Bean�� �۷ι��ϰ� ��� Ŭ���� �� ��������. Autowired�� �� ��Ʈ�ѷ� Ŭ���� �ȿ����� ���԰���
//model.addOnject("mList", mList);
//List<Map<String, Object>> mList=(List<Map<String, Object>>)request.getAttribute("mList");
//response.sendRedirect("/member/jsonMemberList");
	//response.sendRedirect("/member/jsonMemberList?mem_id=tomato");
	//���ϰ� forEach���� ��� �� �� �ִ�.
	//test�ó�����
	//localhost:8000/member/memberList
%>
<c:forEach var="map" items="${mList}" varStatus="x">
	${mList[x.index]}
</c:forEach>