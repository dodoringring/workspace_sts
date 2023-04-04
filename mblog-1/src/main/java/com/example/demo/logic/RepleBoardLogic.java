package com.example.demo.logic;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.demo.dao.RepleBoardDao;

@Service
public class RepleBoardLogic {
	
	Logger log = LogManager.getLogger(RepleBoardLogic.class);
	
	@Autowired
	private RepleBoardDao rbDao = null;

	public List<Map<String, Object>> qnaList(Map<String, Object> pmap) {
		log.info("qnaList called");
		List<Map<String, Object>> blist = null;
		blist = rbDao.qnaList(pmap);
		return blist;
	}

	public int qnaInsert(Map<String, Object> pmap) {
		log.info("qnaInsert called");
		//여기서 받아온 result는 insert 성공 유무를 나타내는 숫자(1이면 성공, 0이면 실패)가 아니라 
		//글 등록시에 채번된 시퀀스를 돌려받는 값이여야 한다. 
		//qna_bno값이여야 한다.
		int result = 0;
		result = rbDao.qnaInsert(pmap);
		//위에서 돌려받은 시퀀스 값(qna_bno)를 pmap에 담아 줘야한다.
		pmap.put("qna_bno", result);//키값이 소문자이면 #{qna_bno}, 대문자이면 #{QNA_BNO}
		//그런데 나는 사용자가 입력한 키값은 모두 소문자로 한다. - 나만의 룰^^
		if(pmap.get("fileNames")!=null) {
			//작성자가 선택하는 이미지의 갯수가 다르다.
			//이미지 선택 3개하면 3개를 담아 내야 한다.- 3개에 대한 Update가 3번 일어나야 한다.
			List<Map<String, Object>> fList=fileNames(pmap);
			log.info(fList);
			rbDao.fileUpdate(fileNames(pmap)); 
		}
		return result;
	}
	private List<Map<String, Object>> fileNames(Map<String, Object> pmap) {
		List<Map<String, Object>> pList=new ArrayList<>();
//		pmap.get("fileNames")=>[맨1, 맨2.png, 맨3]
		HashMap<String , Object> fMap=null;
		String[] fileNames=pmap.get("fileNames").toString()
																	.substring(1, pmap.get("fileNames").toString().length()-1).split(",");
		for(int i=0; i<fileNames.length;i++) {
			fMap=new HashMap<String, Object>();
			fMap.put("file_name", fileNames[i]);
			fMap.put("qna_bno", pmap.get("qna_bno"));
			pList.add(fMap);
		}
		return pList;
	}

	public String imageUpload(MultipartFile image) {//requestParam get에서 값을 꺼내올 때 사용하기도 했지만... quillEditor에서 formData.append("image", file) -> 타입 맞춰줄것.
		//required -> false로 주지않으면 필수값으로 요구되어서 터짐
		log.info("imageUpload 호출 성공");
		//이미지 업로드가 된 파일에 대한 file_name, file_size, file_path등을 결정 해준다. -서비스 계층이다. 로직이 서비스계층. -과장,차장, 부장
		Map<String, Object> pMap=new HashMap<>();
		//사용자가 선택한 파일 이름 담기
		String filename = null;
		String filepath = null;
		double d_size=0.0;
		if(!image.isEmpty()) {
			//filename = image.getOriginalFilename();
			//같은 파일명으로 업로드 되는 경우 덮어쓰기 되는 것을 방지하고자 오리지널 파일명 앞에 날짜와 시간정보를 활용하여
			//절대 같은 이름이 발생하지 않도록 처리해본다.
			SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss");
			Calendar time=Calendar.getInstance();
			filename=sdf.format(time.getTime())+"-"+image.getOriginalFilename().replaceAll(" ","-" );
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
				//여기까지는 이미지 파일 쓰기 처리였고 이 다음에는 mblog_file테이블에 insert될 정보를 초기화 해줌
				d_size=Math.floor(file.length()/(1024.0)*10)/10;//더블로 나오게 
				log.info(d_size);
				log.info(filename);
				log.info(fullPath);
				pMap.put("file_name", filename);
				pMap.put("file_size", d_size);
				pMap.put("file_path", fullPath);
				int result=rbDao.fileInsert(pMap);
				log.info(result);
			} catch (Exception e) {
				e.printStackTrace();//에러발생 이력추적
				log.info(e.toString());
			}
		}
		//리턴 값으로 선택한 이미지 파일명을 넘겨서 사용자 화면에 첨부된 파일명을 열거해주는데 사용할 것임
		String temp = filename;
		return temp;
	}
	

}