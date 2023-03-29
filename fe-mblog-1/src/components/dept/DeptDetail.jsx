import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import BlogFooter from '../include/BlogFooter'
import BlogHeader from '../include/BlogHeader'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { deptDeleteDB, deptListDB, deptUpdateDB } from '../../service/dbLogic'
import { MyInput, MyLabel, MyLabelAb } from '../styles/FormStyle'
import { validateDname } from '../../service/validateLogic'

const DivDeptBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 20px;
`;

const DivUploadImg = styled.div`
  display: flex;
  width: 200px;
  height: 250px;
  align-items: center;
  overflow: hidden;/* 넘치는 부분은 잘라낸다. */
  margin: 10px auto;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeptDetail = ({imageUploader}) => {
  //부서번호를 클릭했을 때 해시값으로 전달된 부서번호 담기
  //사용자가 부서번호를 선택할 때마다 변경되니까 useEffect에서 의존배열인자로 사용함
  const {deptno} = useParams();// App.jsx의 Route path 해시값으로 넘어온다 - 바뀐다 //사용자가 선택한 부서번호를 가져옴
  const [dname, setDname] = useState('')
  const [loc, setLoc] = useState('')
  //오라클 서버에서 파라미터로 넘어온 부서번호를 가지고 한 건을 조회한 후에 담기
  const [dept, setDept] = useState({
    //초기화 할 경우 이 안에 객체 리터럴을 넣어서 해줄것
    DEPTNO: 0,
    DNAME: '',
    LOC: '',
    FILENAME: '',
    FILEURL: '',
    //대문자를 쓴 이유는 MyBatis를 쓰고있기 때문에...
  });
  const navigate = useNavigate();
  //수정화면 모달 마운트(화면에 나타남 <-> 언마운트) 여부 결정 - fasle:안보임, true:보임
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const deptDelete = () => {
    console.log("삭제");
    const asyncDB = async() => {
      const res = deptDeleteDB({deptno: deptno})
      console.log(res.data)
      navigate("/dept/0")
    }
    asyncDB()
  }

  useEffect (() => {//첫번째 인자:함수 두번째 인자:변수
    //파라미터로 넘어오는 deptno가 바뀌면 다시 실행됨 아래의 실행문들이...
    const asyncDB = async () => {
      console.log('asyncDB')
      const res = await deptListDB({deptno:deptno})
      console.log(res.data)
      const result = JSON.stringify(res.data)
      const jsonDoc = JSON.parse(result)
      setDept({ DEPTNO: jsonDoc[0].DEPTNO, 
                DNAME: jsonDoc[0].DNAME, 
                LOC: jsonDoc[0].LOC, 
                FILENAME: jsonDoc[0].FILENAME, 
                FILEURL: jsonDoc[0].FILEURL})
    }
    asyncDB();
    return () => {
      //언마운트 될 때 처리할 일이 있으면 여기에 코딩할 것
    }
  },[deptno])//deptno가 변경될 때마다 함수가 실행됨 //사용자가 deptno를 클릭할 때마다 바뀌어야함... 그래서 deptno를 넣어주는 모양 그걸 읽어서 useState에 담아줘야함
  if(!dept.FILEURL){
    dept.FILEURL = "http://via.placeholder.com/200X250";
  }

  //부서목록 페이지 이동하기
  const deptList = () => {
    navigate("/dept/0");
  }
  //리액트에서는 메모이제이션 컨벤션이 있음
  //메모이제이션을 제공하는 대표적인 훅이 useMemo와 useCallback이 있음 - 첫번째 파라미터에는 함수가, 두번째 파라미터로는 의존성 배열이 들어간다.
  //차이점: useMemo는 값을 반환하고 useCallback은 함수를 반환함
  //리렌더링은 언제 일어날까
  // 1. state가 변경되었을 때  2. props가 변경되었을 때  3. 부모컴포넌트가 변경되었을 때
  const handleDname = useCallback((value) => {
    console.log(value);
    setDname(value);
  }, [])
  //아래와 같이 함수를 선언하면 DeptDetail이 마운트될 때마다 주소번지가 바뀐다 -> 새로 읽는다 -> 초기화가 일어난다 -> 비효율적
  //함수의 구현 내용이 변화가 없는 경우라면 한 번 생성된 주소번지를 계속 가지고 있어도 되지 않나?
  //그럼 이걸 기억해줘 -> cache에 -> 필요할 때 새로 생성하지 말고 cache에 있는 함수를 불러줘
  //이렇게 처리할 때 useCallback을 사용하자! 사용하면 캐시 메모리에서 땡겨옴. 의존성 배열이 바뀔 때마다.
  /* const handleLoc = (value) => {
    console.log(value);
    setLoc(value);
  } */
  const handleLoc = useCallback((value) => {
    console.log(value);
    setLoc(value);
  }, [])

    //filename, fileurl 두가지라 객체로 선언함
    const [file, setFiles] = useState({filename: null, fileurl: null})//null로 초기화
    const handleClose = () => setShow(false)
    const [comment, setComment] = useState({
      deptno: "",
      dname: "",
      loc: ""
    });
  
    const [star, setStar] = useState({
      deptno: "*",
      dname: "*",
      loc: "*"
    });
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
  const imgChange = async (event) => {
    // console.log(event.target.files[0])
    const uploaded = await imageUploader.upload(event.target.files[0])
    setFiles({//객체니까 중괄호 붙이기
      filename: uploaded.public_id + "." + uploaded.format,
      fileurl: uploaded.url
    })
    //미리보기에 넣어줘야하니까 input의 이미지 객체 얻어오기
    const upload = document.querySelector("#dimg")
    //이미지를 집어넣을 곳의 부모태그
    const holder = document.querySelector("#uploadImg")
    const file = upload.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result
      if(img.width > 150){
        img.width = 150
      }
      holder.innerHTML = "";
      holder.appendChild(img)
    }
    reader.readAsDataURL(file)
    return false
  }

  //부서 정보 수정 구현 //이것도 3000번과 8000번 크로스하고 있으니까 비동기처리 해야함 ~ async/await을 사용하자
  //스프링 부트와 리액트 연동하기 - @RequestBody를 사용해서 JSON포맷으로 넘김
  const deptUpdate = async () => {
    const dept = {
      deptno,
      dname,
      loc,
      filename: file.filename,
      fileurl: file.fileurl
    }
    const res = await deptUpdateDB(dept)
    if(!res.data){//성공하면 넘어오는 게 result값 1... !를 붙였으니 false일 때 참임.
      console.log("부서 등록에 실패함")
    } else {
      //성공했다면 목록으로 이동하자
      console.log("부서 등록 성공")
      //그리고 부서 목록페이지 새로고침 해주자 - window.location.reload() 쓰지 말것 - SPA컨벤션 ~ 가능하면 쓰지 말기로..
      //useEffect - 의존성 배열을 연습할 수 있음
      handleClose()//모달창을 닫기
      //부서목록 새로고침 처리
      navigate("/dept/1");
    }
  }

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
            <DivDeptBody>
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
      {/* ========================== [[ 부서정보 수정화면 Modal ]] ========================== */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>부서정보 수정</Modal.Title>
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
            <Img src="http://via.placeholder.com/200X250" alt="미리보기" />
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
      {/* ========================== [[ 부서정보 수정화면 Modal ]] ========================== */}  
      <BlogFooter/>
    </>
  )
}

export default DeptDetail
