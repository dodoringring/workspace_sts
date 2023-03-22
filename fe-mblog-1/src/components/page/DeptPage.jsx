import React, { useCallback, useEffect, useState } from 'react'
import '../css/style.css'
import BlogHeader from '../include/BlogHeader'

import { Modal, Form, Button, Table } from 'react-bootstrap'
import DeptRow from '../dept/DeptRow'
import { deptInsertDB, deptListDB } from '../../service/dbLogic'
import { useNavigate, useParams } from 'react-router-dom'
import { MyInput, MyLabel, MyLabelAb } from '../styles/FromStyle'
import { validateDname } from '../../service/validateLogic'

const DeptPage = ({imageUploader}) => {
  //화면전환시나 가급적 전체페이지 리로딩을 하지 않음
  //navigate 훅을 사용하면 됨
  const navigate=useNavigate()
  //path='.dept/:gubun'
  //디폴트는 없고 부서등록이 성공하면 1을 돌려줌
  const gubun = useParams()
  const [deptList, setDeptList]=useState([])//리렌더링이 계속 되는부분이면 배열로한다. 값이 계속바뀌니까
  const [show, setShow]=useState(false)
  const handleClose=()=>setShow(false)
  const handleShow=()=>setShow(true)
  //받아올 값 선언
  const [deptno,setDeptno]=useState(0)
  const [dname,setDname]=useState("")
  const [loc,setLoc]=useState("") //값을 입력하게 되면 onChange속성이 변화부분을 감지한다.
  //filename하나 fileurl 둘이니 객체로 선언할것
  const [file, setFiles]=useState({filename:null,fileurl:null})
  const [comment, setComment]=useState({
    deptno:"",
    dname:"",
    loc:"",
  })
  const [star, setStar]=useState({
    deptno:"*",
    dname:"*",
    loc:"*",
  })
  //유효성 체크 함수
  const validate = (key, e) => {
    console.log('validate : ' + key)
    let result;
    if(key === 'dname') {
      result = validateDname(e);
    }
    setComment({...comment, [key]:result});
    if(result){
      if(result === ''){
        setStar({...star, [key]:""})
      } else {
        setStar({...star, [key]:"*"})
      }
    } else {
      setStar({...star, [key]:""})
    }
  }
    const handleDeptno=useCallback((value)=>{
    console.log(value);
    setDeptno(value)
  },[])//화면에서는 계속 기억을 할 필요없다. 화면 다 그려져 있으니까. 그래서 의존성 배열 비워둔다.
  const handleDname = useCallback((value) => {
    console.log(value);
    setDname(value);
  }, [])
  const handleLoc = useCallback((value) => {
    console.log(value);
    setLoc(value);
  }, [])
  //조건 검색 구현
  const reactSearch=()=>{
    //select 콤보에서 선택한 값 담기
    const gubun=document.querySelector("#gubun").value
    //조건검색에 필요한 문자열 담기
    const keyword=document.querySelector("#keyword").value
    console.log(gubun+","+keyword);
    const asyncDB=async()=>{
      const res = await deptListDB({gubun, keyword, deptno: 0})
      console.log(res.data)
      if(res.data) {
        setDeptList(res.data)
      }
    }
    asyncDB();
  }
  //부서 목록 가져오기
  // const deptList=()=>{

  // }
  // 부서목록 JSON포맷 가져오기
  const jsonDeptList = async() => {
    const res = await deptListDB({deptno: 0})
    console.log(res.data)
    if(res.data) {
      setDeptList(res.data)
    } else {
      console.log('부서목록 조회 실패')
    }
  }
    useEffect(()=>{
      jsonDeptList()
    },[gubun])//의존성배열 없으면 무한루프. 한번만 돌게 [] 넣어줌
    //의존성 배열에 올 수 있는 변수


  //이미지 파일 첨부 구현
  const imgChange=async(event)=>{
    // console.log(event.target.files[0]);
    const  uploaded=await imageUploader.upload(event.target.files[0])
    setFiles({
      filename:uploaded.public_id+"."+uploaded.format,
      fileurl:uploaded.url
    })
    //input의 이미지 객체 얻어오기
    const upload=document.querySelector("#dimg")
    //이미지를 넣을곳의 부모태그
    const holder=document.querySelector("#uploadImg")
    const file=upload.files[0]
    const reader=new FileReader()
    reader.onload=(event)=>{
    const img=new Image()
    img.src=event.target.result
    if(img.width>150){
      img.width=150
    }
    holder.innerHTML="";
    holder.appendChild(img)
    }
    reader.readAsDataURL(file)
    return false
  }
  //부서 등록 구현
  //Spring과 리액트연계하기-@RequestBody를 사용해서 JSon포맷으로 넘기는 컨셉
  const deptInsert=async()=>{
    const dept={
      deptno,
      dname,
      loc,
      filename:file.filename,
      fileurl:file.fileurl
    }
    const res=await deptInsertDB(dept)
    if(!res.data){//js에서는 0외(6가지)아니면 참
      console.log("부서등록에 실패 했습니다.");
    }
    else{
      console.log('부서등록 성공했습니다.');
      //성공시 부서목록 새로고침 처리 할것-window.location.reload()쓰지말것-SPA컨벤션 
      //새로매번 고침하는거는 리액트아니다. 후지다
      //useEffect-의존성 배열을 연습할 수 있음
      handleClose();//모달창닫기
      //부서목록새로고침처리
      navigate("/dept/1")
    }
  }
  
  return (
    <>
      <BlogHeader/>
      <div className="container">
      <div className="page-header">
      <h2>부서관리&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;<small>부서목록</small></h2>
        <hr />
	    </div>      
      <div className="row">
        <div className="col-3">
          <select id="gubun" className="form-select" aria-label="분류선택">
            <option defaultValue>분류선택</option>
            <option value="deptno">부서번호</option>
            <option value="dname">부서명</option>
            <option value="loc">지역</option>
          </select>			
        </div>
		    <div className="col-6">
			    <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" 
                 aria-label="검색어를 입력하세요" aria-describedby="btn_search" />
		    </div>
		    <div className="col-3">
			    <Button variant='danger' id="btn_search" onClick={reactSearch}>검색</Button>
		    </div>
	     </div> 
      <div className='book-list'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>부서번호</th>
              <th>부서명</th>
              <th>지역</th>
            </tr>
          </thead>
          <tbody>
          {deptList.map(dept => (
            <DeptRow key={dept.DEPTNO} dept={dept} />
          ))}
          </tbody>
        </Table> 
        <hr />    
        <div className='booklist-footer'>
          <Button variant="warning" onClick={jsonDeptList}>
            전체조회
          </Button>&nbsp; 
          <Button variant="success" onClick={handleShow}>
            부서등록
          </Button> 
        </div>
      </div>
    </div>
       {/* ========================== [[ 도서등록 Modal ]] ========================== */}
       <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>부서등록</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{display: 'flex', flexWrap:'wrap', justifyContent:'center'}}>{/* 글자와 그림을 감싸주는 flex */}
            <div style={{display: 'flex'}}>
              <MyLabel>부서번호<span style={{color:'red'}}>{star.deptno}</span>
                <MyInput type="text" id="deptno" placeholder="Enter 부서번호" onChange={(e) => {handleDeptno(e.target.value)}} />{/* name은 서블릿과 연결할 때 사용하고 리액트는 id를 사용하자 */}
              <MyLabelAb>{comment.deptno}</MyLabelAb>
              </MyLabel>
           </div>
            <div style={{display: 'flex'}}>
              <MyLabel>부서명<span style={{color:'red'}}>{star.dname}</span>
                <MyInput type="text" id="dname" placeholder="Enter 부서명" onChange={(e) => {handleDname(e.target.value); validate('dname', e);}} />{/* 유효성 체크하는 함수 호출 */}
                <MyLabelAb>{comment.dname}</MyLabelAb>
              </MyLabel>
            </div>
            <div style={{display: 'flex'}}>
              <MyLabel>지역<span style={{color:'red'}}>{star.loc}</span>
                <MyInput type="text" id="loc" placeholder="Enter 지역" onChange={(e) => {handleLoc(e.target.value)}} />
                <MyLabelAb>{comment.loc}</MyLabelAb>
              </MyLabel>
            </div>
            <Form.Group className="mb-3" controlId="formBasicOffice">
              <Form.Label>건물이미지</Form.Label>
                <input className="form-control" type="file" accept='image/*' id="dimg" name="dimg" onChange={imgChange}/>
            </Form.Group>
            <div id="uploadImg">
              <img className='thumbNail' src="http://via.placeholder.com/200X250" alt="미리보기" />
            </div>
          </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={deptInsert}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>     
      {/* ========================== [[ 부서등록 Modal ]] ========================== */}  
    </>
  )
}

export default DeptPage