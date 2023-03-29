package com.html;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.google.gson.Gson;
import com.util.DBConnectionMgr;
import com.util.MyBatisCommonFactory;
import com.vo.MemberVO;

public class MemberDao {
	DBConnectionMgr mgr = new DBConnectionMgr();
	MyBatisCommonFactory mcf = new MyBatisCommonFactory();
	Connection con = null;
	PreparedStatement pst = null;
	ResultSet rs = null;//커서 조작하여 한건씩 데이터 빼내오기 위한
	
	public List<Map<String, Object>> getMemberList(){
		List<Map<String, Object>> memList = null;
		System.out.println("getMemberList 호출");
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT mem_num, mem_id, mem_name FROM MEMBER");//; 절대 안됨~~~
		try {
			//물리적으로 떨어져있는 오라클 서버에 연결 통로 확보
			con = mgr.getConnection();
			//연결 통로를 통해서 SELECT문을 가져가고 오라클 서버에게 요청하는 객체로딩
			pst = con.prepareStatement(sql.toString());
			//오라클 서버의 커서를 조작할 객체 로딩
			rs = pst.executeQuery();
			memList = new ArrayList<>();
			Map<String, Object> rmap = null;
			while(rs.next()) {
				rmap = new HashMap<>();
				rmap.put("mem_num", rs.getInt("mem_num"));
				rmap.put("mem_id", rs.getString("mem_id"));
				rmap.put("mem_name", rs.getString("mem_name"));
				memList.add(rmap);
			}
			System.out.println(memList);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			//사용한 자원을 반납하기 - 명시적으로 반납할 것 - 실행 시점을 당기기 위해 - 튜닝팀의 권장 사항
			mgr.freeConnection(con, pst, rs);
		}
		return memList;
	}
	
	public String getJsonMemberList(){
		System.out.println("getMemberList 호출");
		List<Map<String, Object>> memList = null;
		StringBuilder sql = new StringBuilder();
		sql.append("SELECT mem_num, mem_id, mem_name FROM MEMBER");//; 절대 안됨~~~
		try {
			//물리적으로 떨어져있는 오라클 서버에 연결 통로 확보
			con = mgr.getConnection();
			//연결 통로를 통해서 SELECT문을 가져가고 오라클 서버에게 요청하는 객체로딩
			pst = con.prepareStatement(sql.toString());
			//오라클 서버의 커서를 조작할 객체 로딩
			rs = pst.executeQuery();
			memList = new ArrayList<>();
			Map<String, Object> rmap = null;
			while(rs.next()) {
				rmap = new HashMap<>();
				rmap.put("mem_num", rs.getInt("mem_num"));
				rmap.put("mem_id", rs.getString("mem_id"));
				rmap.put("mem_name", rs.getString("mem_name"));
				memList.add(rmap);
			}
//			System.out.println(memList);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			//사용한 자원을 반납하기 - 명시적으로 반납할 것 - 실행 시점을 당기기 위해 - 튜닝팀의 권장 사항
			mgr.freeConnection(con, pst, rs);
		}
		Gson g = new Gson();
		String temp = null;
		temp = g.toJson(memList);
		return temp;
	}
	/*
	 * 위는 json으로 바꿀수 없고 아래는 가능함
	 */
	
	public List<Map<String, Object>> myBatisMemberList() {
		System.out.println("getMemberList호출");
		//물리적으로 떨어져있는 서버와 연결통로 확보 - MyBatisConfig.xml 문서의 정보(드라이버 클래스, 오라클 서버의 URL주소, 계정 정보 + 쿼리문 담은 xml 등록)를 참조
		SqlSessionFactory ssf = null;
		//SqlSession으로 commit과 rollback을 지원받음
		SqlSession ss = null;
		List<Map<String, Object>> memList = null;
		Map<String, Object> pmap = new HashMap<>();
		pmap.put("mem_num", 2);
		try {
			ssf = mcf.getSqlSessionFactory();
			ss = ssf.openSession();
			memList = ss.selectList("memberList", pmap);//id값 ~ 한건인 경우 selectOne, 여러 건인 경우 selectList
//			ss.commit();//insert/update/delete를 했을 때 이런식으로 commit해주면 됨
//			System.out.println(memList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return memList;
	}
	
	public List<MemberVO> myBatisMemberList2() {
		System.out.println("getMemberList호출");
		SqlSessionFactory ssf = null;
		SqlSession ss = null;//처리 요청
		List<MemberVO> memList = null;
		Map<String, Object> pmap = new HashMap<>();
		pmap.put("mem_num", 0);//0을 주면 where문이 실행되지 않음
		try {
			ssf = mcf.getSqlSessionFactory();
			ss = ssf.openSession();
			memList = ss.selectList("memberList2", pmap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return memList;
	}
	
	public static void main(String[] args) {//메인이 있는 건 서버에서 실행이 안됨
		MemberDao md = new MemberDao();
//		md.getMemberList();
//		String temp = md.getJsonMemberList();
//		System.out.println(temp);
//		List<Map<String, Object>> temp = md.myBatisMemberList();
		List<MemberVO> temp = md.myBatisMemberList2();
		System.out.println(temp);
//		Gson g = new Gson();
//		String str = g.toJson(temp);
//		System.out.println(str);
	}
}
