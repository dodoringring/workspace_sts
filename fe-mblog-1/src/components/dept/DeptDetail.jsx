import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deptDeleteDB, deptListDB, deptUpdateDB } from '../../service/dbLogic';
import { validateDname } from '../../service/validateLogic';
import BlogFooter from '../include/BlogFooter';
import BlogHeader from '../include/BlogHeader'
import { MyInput, MyLabel, MyLabelAb } from '../styles/FromStyle';

const DivUploadImg=styled.div`
  display:flex;
  width:200px;
  height:250px;
  align-items:center;
  overflow:hidden;
  margin:10px auto;
`
const Img=styled.img`
  width:100%;
  height:100%;
  object-fit:cover;
`

const DivDeptBody=styled.div`
  display:flex;
  flex-direction:column;
  margin:0px 20px;
`;

const DeptDetail = ({imageUploader}) => {
  //부서번호를 클릭 했을때 해시값으로 전달된 부서번호를 담기
  //사용자가 부서번호를 선택 할 때 마다 변경되니까 useEffect에서 의존배열인자로 사용함
  //수정화면 모달 마운트(화면에 나타나는) 여부 결정 - false일때 안보임, true일때 보임
  const {deptno}=useParams()//App.jsx의 Route path에서 해쉬값으로 넘어온다.-바뀐다.
  const [dname, setDname]=useState('')
  const [loc, setLoc]=useState('')
  //오라클 서버에서 파라미터로 넘어온 부서번화를 가지고 한건을 조회한 후에 담기
  const [dept,setDept]=useState({
    DEPTNO:0,
    DNAME:'',
    LOC:'',
    FILENAME:'',
    FILEURL:'',
  })
  const navigate=useNavigate()
  const [show,setShow]=useState(false)
  const handleShow=()=>setShow(true)
  const deptList=()=>{
    navigate("/dept/0")
  }
  //부서목록 페이지 이동하기
  const deptDelete=()=>{
    console.log('삭제')
    const asyncDB=async()=>{
      const res=deptDeleteDB({deptno:deptno})
      
      navigate("/dept/0")
      asyncDB()
    }
  }//end of deptDelete
  

  useEffect(()=>{//함수는 객체이다...
    //파라미터로 넘어오는 deptno가 바뀌면 useEffect안의 실행문들이 다시 실행된다.
    const asyncDB=async()=>{
      const res =await deptListDB({deptno:deptno})
      console.log(res.data);
      const result=JSON.stringify(res.data)
      const jsonDoc=JSON.parse(result)
      console.log(jsonDoc[0].LOC);
      setDept({DEPTNO:jsonDoc[0].DEPTNO, 
                DNAME:jsonDoc[0].DNAME, 
                LOC:jsonDoc[0].LOC, 
                FILENAME:jsonDoc[0].FILENAME, 
                FILEURL:jsonDoc[0].FILEURL})
      //[0]이유는? select하는 정보가 한건이고 0번째 맵에 있다.
    }
    asyncDB()
    return ()=>{
      //언마운트될때 처리할 일이 있으면 여기에 코딩할것
    }
  },[deptno])//deptno가 변경 될 때 마다 함수가 실행된다. 의존성이 부서번호에 있다.
  if(!dept.FILEURL){
    dept.FILEURL="http://via.placeholder.com/200X250"
  }
//리액트에서는 메모이제이션이라는 컨벤션이있다.
//useMemo와 useCallback-첫번째 파라미터 함수가 두번째 파라미터 의존성 배열임
//차이점: useMemo는 값을 반환하고 useCallback은 함수를 반환한다.
//리렌더링은 언제 일어 나나요?
//1. state가 변경되면
//2.props가 변경
//3.부모 컴포넌트가 변경되면
  const handleDname = useCallback((value) => {
    console.log(value);
    setDname(value);
  }, [])
  //useEffect 빼고 함수를 선언하면 DeptDetail컴포넌트가 마운트 될때마다 주소번지가 바뀐다. 
  //초기화가 일어난다. 함수의 구현내용이 변화가 없는 경우라면 주소번지를 계속 가져도 될듯? 
  //그러면 이걸 좀 기억해줘-cache-필요할때 새로 생성하지 말고 cache에 있는 함수를 불러줘
  //이렇게 처리할때 useCallback사용함
  const handleLoc = useCallback((value) => {
    //console.log(value);
    setLoc(value);
  },[]);

  const [file, setFiles]=useState({filename:null,fileurl:null})
  const handleClose=()=>setShow(false)
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

//부서 정보 수정 구현
  //Spring과 리액트연계하기-@RequestBody를 사용해서 JSon포맷으로 넘기는 컨셉
  const deptUpdate=async()=>{
    const dept={
      deptno,
      dname,
      loc,
      filename:file.filename,
      fileurl:file.fileurl
    }
    const res=await deptUpdateDB(dept)
    if(!res.data){//js에서는 0외(6가지)아니면 참
      console.log("부서 정보수정에 실패 했습니다.");
    }
    else{
      console.log('부서 정보수정 성공했습니다.');
      //성공시 부서목록 새로고침 처리 할것-window.location.reload()쓰지말것-SPA컨벤션 
      //새로매번 고침하는거는 리액트아니다. 후지다
      //useEffect-의존성 배열을 연습할 수 있음
      handleClose();//모달창닫기
      //부서목록새로고침처리
      navigate("/dept/1")
    }
  }//enf of imageChange

  return (
    <>
    <BlogHeader />
      <div className='container'>
        <div className="page-header">
          <h2>부서관리&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;<small>상세보기</small></h2>
          <hr />
        </div> 
        <Card style={{width: '58rem'}}>
          <Card.Body>
            <Card.Img style={{width: '250px'}} src={`${dept.FILEURL}`} alt="Card image" />
              <DivDeptBody>{/* 스타일을 컴포넌트화시켜서 사용 */}
              <Card.Title>{dept.DNAME}</Card.Title>
              <Card.Text>{dept.LOC}</Card.Text>
              <Card.Text>{dept.DEPTNO}</Card.Text>
              </DivDeptBody>
          </Card.Body>
          <div>
            <Button onClick={handleShow}>수정</Button>
            &nbsp;
            <Button onClick={deptDelete}>삭제</Button>
            &nbsp;
            <Button onClick={deptList}>부서목록</Button>
          </div>
        </Card>
      </div>    

      {/* ========================== [[ 도서등록 Modal ]] ========================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>부서정보수정</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div style={{display: 'flex', flexWrap:'wrap', justifyContent:'center'}}>{/* 글자와 그림을 감싸주는 flex */}
            <div style={{display: 'flex'}}>
              <MyLabel>부서번호<span style={{color:'red'}}>{star.deptno}</span>
                <MyInput type="text" id="deptno" placeholder="Enter 부서번호" value={deptno} />{/* name은 서블릿과 연결할 때 사용하고 리액트는 id를 사용하자 */}
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
            <DivUploadImg id="uploadImg">
         
              <img className='thumbNail' src="http://via.placeholder.com/200X250" alt="미리보기" />
            </DivUploadImg>
        
          </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={deptUpdate}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>     
      {/* ========================== [[ 부서등록 Modal ]] ========================== */}

      <BlogFooter/>
    </>
  )
}

export default DeptDetail
