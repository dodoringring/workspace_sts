package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.logic.DeptLogic;
import com.example.demo.vo.DeptVO;
import com.google.gson.Gson;

@RestController
@RequestMapping("/dept/*")
public class RestDeptController {
	Logger log = LoggerFactory.getLogger(RestDeptController.class);
	
	@Autowired
	private DeptLogic dl = null;
	
	/*****************************************************************
	 * 부서등록 구현
	 * @param dvo
	 * @return insert문 성공 여부 : 1이면 등록 성공 0이면 등록 실패
	 *****************************************************************/
	//단위 테스트 URL은 => http://localhost:8000/dept/deptInsert이나 테스트는 불가함
	@PostMapping("deptInsert")
	public String deptInsert(@RequestBody DeptVO dvo) {
		log.info(dvo.toString());
		int result = 0;
		result = dl.deptInsert(dvo);
		return String.valueOf(result);
	}
	
	@PostMapping("deptUpdate")
	public String deptUpdate(@RequestBody DeptVO dvo) {
		log.info(dvo.toString());
		int result = 0;
		result = dl.deptUpdate(dvo);
		log.info("result : " + result);
		return String.valueOf(result);
	}

	@GetMapping("deptDelete")
	public String deptDelete(int deptno) {
		log.info("사용자가 선택한 부서 번호 - 단 자손이 없어야 함" + deptno);
		int result = 0;
		result = dl.deptDelete(deptno);
		return String.valueOf(result);
	}
	
	@GetMapping("deptList")//리액트 서비스에서 get으로 맞췄기 때문에 get으로 작성해줄것.
	public String deptList(@RequestParam Map<String, Object> pmap) {
		List<Map<String, Object>> dlist = null;
		dlist = dl.deptList(pmap);
		Gson g = new Gson();
		String temp = g.toJson(dlist);
		return temp;
	}
}
/*
 * @Controller는 리턴값이 화면출력으로 사용
 * @RestController는 리턴값에 대한 마임타입이 text/plain으로 사용됨
 * 리액트 연동시 조회된 결과나 백엔드에서 전달되는 값은 text이거나 json포맷만 가능하므로 후자를 선택함
 * 
 * @RequestBody는 post방식으로 사용자가 입력한 값이 보안상 중요한 정보인 경우 사용가능
 * 패킷 헤더가 아닌 바디에 저장되므로 노출 위험 없음
 *
 */