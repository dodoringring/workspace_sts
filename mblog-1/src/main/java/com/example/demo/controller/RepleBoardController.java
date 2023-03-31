package com.example.demo.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.demo.logic.RepleBoardLogic;
import com.google.gson.Gson;

@RestController
@RequestMapping("/reple/*")
public class RepleBoardController {
	
	Logger log = LogManager.getLogger(RepleBoardController.class);
	
	@Autowired
	private RepleBoardLogic rbLogic = null;
	
	@PostMapping("qnaInsert")
	public String qnaInsert (@RequestBody Map<String, Object> pmap) {//리액트에서 body에 {}로 넘어와도 VO가 아니어도
		log.info("qnaInsert called => " + pmap);//리액트 화면에서 넘어온 값 찍어보기
		int result = 0;
		result = rbLogic.qnaInsert(pmap);
		return String.valueOf(result);
	}
	
	@GetMapping("imageGet")//파일 이름 받아와야하니까 get...
	public Object imageGet(HttpServletRequest req, HttpServletResponse res) {
		//imageName정보는 공통코드로 제공된 QuillEditor.jsx에서 파라미터로 넘어오는 값임
		//imageUpload메소드에서는 업로드된 파일 정보(파일명, 파일 크기)가 리턴됨
		String b_file = req.getParameter("imageName");//get방식으로 넘어오는 정보를 받아서 아래에서 확인...
		log.info("imageGet 호출 성공===>"+b_file);//XXX.png
		//톰캣 서버의 물리적인 위치
		String filePath = "D:\\workspace_sts\\mblog-1\\src\\main\\webapp\\pds"; // 절대경로.	
		String fname = b_file;
		log.info("b_file: 8->euc"+b_file);
		//File은 내용까지 복제되는 것은 아니고 파일명만 객체화 해주는 클래스임.
		File file = new File(filePath,b_file.trim());
		//실제 업로드된 파일에 대한 마임타입을 출력해줌
	 	String mimeType = req.getServletContext().getMimeType(file.toString());
	 	log.info(mimeType);//img? video? text?
		if(mimeType == null){//마임타입이 널이면 아래 속성값으로 마입타입을 설정해줌
			//왜 이렇게 하나요? 브라우저가 해석이 가능한 마임타입은 브라우저 상에서 열림. 그러니까 다운로드 받고싶을 경우 브라우저가 읽을 수 없는 마임타입을 설정해줘야함.
			//브라우저가 해석 가능한 마임타입을 페이지 로딩(화면에 그대로 출력) 처리해버리기 때문에 강제로 다운로드 처리를 위한 속성값 변경
			res.setContentType("application/octet-stream");
		}
		//다운로드되는 파일 이름 담기
		String downName = null;
		//위 File객체에서 생성된 객체에 내용을 읽기 위한 클래스 선언
		FileInputStream fis = null;
		//응답으로 나갈 정보가 웹서비스에 처리되어야하므로 사용한 객체
		ServletOutputStream sos = null;
		try{
			if(req.getHeader("user-agent").indexOf("MSIE")==-1){
				downName = new String(b_file.getBytes("UTF-8"),"8859_1");
			}else{
				downName = new String(b_file.getBytes("EUC-KR"),"8859_1");
			}
			//응답 헤더에 다운로드될 파일명을 매핑 하기
		   	res.setHeader("Content-Disposition", "attachment;filename="+downName);
		   	//위에서 생성된 파일 문자열 객체를 가지고 파일 생성에 필요한 객체의 파라미터 넘김
		 	fis = new FileInputStream(file);
			sos = res.getOutputStream();
			//파일 내용을 담을 byte 배열을 생성
			byte b[] = new byte[1024*10];
			int data = 0;
			while((data=(fis.read(b,0,b.length)))!=-1){
				//파일에서 읽은 내용을 가지고 실제 파일에 쓰기 처리 함
				//여기서 처리된 값은 브라우저를 통해서 내보내짐
				sos.write(b,0,data);
			}
			//처리한 내용이 버퍼에 있는데 이것을 모두 처리요청을 하기
			//내보내고 버퍼를 비운다. - 버퍼는 크기가 작음 - 휘발성 -> 뒤의 정보가 앞의 정보를 밀어내버림 -> 유실 발생 가능 -> 그래서 flush로 비워줌.
			sos.flush();		
		}catch(Exception e){
			log.info(e.toString());
		}finally{
			try {
				if(sos != null) sos.close();
				if(fis != null) fis.close();				
			} catch (Exception e2) {
				// TODO: handle exception
			}
		}
		
		//byte[] fileArray = boardLogic.imageDownload(imageName);
		//logger.info(fileArray.length);
		return null;
	}// end of imageGet
	
	@PostMapping("imageUpload")//첨부파일 처리할 때는 반드시 postMapping
	public Object imageUpload(MultipartHttpServletRequest mRequest, @RequestParam(value="image", required=false) MultipartFile image) {//requestParam get에서 값을 꺼내올 때 사용하기도 했지만... quillEditor에서 formData.append("image", file) -> 타입 맞춰줄것.
		//required -> false로 주지않으면 필수값으로 요구되어서 터짐
		log.info("imageUpload 호출 성공");
		//사용자가 선택한 파일 이름 담기
		String filename = null;
		if(!image.isEmpty()) {
			filename = image.getOriginalFilename();
			//이미지에 대한 업로드이므로 첨부파일 크기 계산은 하지않음
			//스프링 프로젝트가 바라보는 물리적인 위치정보
			String saveFolder = "D:\\workspace_sts\\mblog-1\\src\\main\\webapp\\pds";
			String fullPath = saveFolder + "\\" + filename;
			try {//네트워크나 IO쪽에서는 무조건 try-catch 해야함...
				//File객체는 파일명을 객체화해주는 클래스임 - 생성되었다고 해서 실제 파일까지 생성되는 것이 아님
				File file = new File(fullPath);
				byte[] bytes = image.getBytes();
				//outputStream 반드시 생성해서 파일정보를 읽어서 쓰기를 처리해줌
				//BufferedOutputStream은 필터 클래스이지 실제 파일을 쓸 수 없는 객체
				//실제 파일 쓰기가 가능한 클래스는 FileOutputStream임 - 생성자 파라미터에 파일 정보 담기
				BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
				//bos ~ 주소번지
				bos.write(bytes);
				//파일 쓰기와 관련 위변조 방지위해 사용후 반드시 닫을 것
				bos.close();
			} catch (Exception e) {
			}
		}
		//리턴 값으로 선택한 이미지 파일명을 넘겨서 사용자 화면에 첨부된 파일명을 열거해주는데 사용할 것임
		String temp = filename;
		return temp;
	}
	
	@PostMapping("fileUpload")//첨부파일 처리할 때는 반드시 postMapping
	public Object fileUpload(MultipartHttpServletRequest mRequest, @RequestParam(value="file_name", required=false) MultipartFile file_name) {//requestParam get에서 값을 꺼내올 때 사용하기도 했지만... quillEditor에서 formData.append("image", file) -> 타입 맞춰줄것.
		//required -> false로 주지않으면 필수값으로 요구되어서 터짐
		log.info("imageUpload 호출 성공");
		//사용자가 선택한 파일 이름 담기
		String filename = null;
		if(!file_name.isEmpty()) {
			filename = file_name.getOriginalFilename();
			//이미지에 대한 업로드이므로 첨부파일 크기 계산은 하지않음
			//스프링 프로젝트가 바라보는 물리적인 위치정보
			String saveFolder = "D:\\workspace_sts\\mblog-1\\src\\main\\webapp\\pds";
			String fullPath = saveFolder + "\\" + filename;
			try {//네트워크나 IO쪽에서는 무조건 try-catch 해야함...
				//File객체는 파일명을 객체화해주는 클래스임 - 생성되었다고 해서 실제 파일까지 생성되는 것이 아님
				File file = new File(fullPath);
				byte[] bytes = file_name.getBytes();
				//outputStream 반드시 생성해서 파일정보를 읽어서 쓰기를 처리해줌
				//BufferedOutputStream은 필터 클래스이지 실제 파일을 쓸 수 없는 객체
				//실제 파일 쓰기가 가능한 클래스는 FileOutputStream임 - 생성자 파라미터에 파일 정보 담기
				BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
				//bos ~ 주소번지
				bos.write(bytes);
				//파일 쓰기와 관련 위변조 방지위해 사용후 반드시 닫을 것
				bos.close();
			} catch (Exception e) {
			}
		}
		//리턴 값으로 선택한 이미지 파일명을 넘겨서 사용자 화면에 첨부된 파일명을 열거해주는데 사용할 것임
		String temp = filename;
		return temp;
	}
	
	@GetMapping("qnaList")
	public String qnaList(@RequestParam Map<String, Object> pmap) {
		log.info("qnaList called");
		List<Map<String, Object>> blist = null;
		blist = rbLogic.qnaList(pmap);
		Gson g = new Gson();
		String temp = g.toJson(blist);
		return temp;
	}
}