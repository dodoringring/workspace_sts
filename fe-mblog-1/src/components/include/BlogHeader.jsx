import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../service/authLogic'

const BlogHeader = ({authLogic}) => {
  const navigate = useNavigate()
  const auth = authLogic.getUserAuth()//firebase/Auth에서 주입해줌
  //로그아웃버튼을 추가하기
  //왜 일반변수가 아닌 상태훅에 담는 것인가?
  //상태훅 에 관리하면 화면에 즉시 반영되니까
  //인증과 인가 구분할 수 있다
  //인증(front-end => sessionStorage, back-end => session: cpu(에서도 cache메모리)에 저장됨)과 인가 구분할 수 있다
  //동기화 처리가 필요함 - 어려움 - 실전연습
  const [email, setEmail] = useState()
  //의존성 배열이란? 실행문(변수선언, 제어문, 로직-기능)이 재요청 되는 기준임
  //빈 배열일때는 딱 한번만 호출됨
  //빈배열을 삭제하면 글자하나만 입력받아도 재요청이 일어난다=비효율적
  //리렌더링 발생 경우 - 1)상태훅 2)props 3)부모컴포넌트가 변경되면=-> return코드 블록이 호출됨
  useEffect(()=>{
    setEmail(sessionStorage.getItem("email"))
    // return; 이러면 렌더링 안된다.
    //인터셉트 해야되서 뭔가 전처리가 필요할 때 아래의 리턴을 쓴다.
    //return()=>{

    //}
  },[])//의존성 배열-useMemo. useCallback(메모이제이션-효율성-실전)
  return (
    <>
      {/* <Navbar bg="primary" variant="dark">
      <Navbar bg="light" variant="light"> */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className='nav-link'>TerrGYM</Link>
          <Nav className="me-auto">
            <Link to="/home" className='nav-link'>Home</Link>
            <Link to="/dept/0" className='nav-link'>부서관리</Link>
            <Link to="/reple/board" className='nav-link'>게시판</Link>
            <Link to="/qna/list" className='nav-link'>QnA게시판</Link>
          </Nav>
          {/* js와jsx 섞어쓰기 */}
          {/* null, undefined 참이아님 조심하기 */}
          {email && <Button variant='primary' onClick={()=>{logout(auth); navigate('/login'); window.location.reload();}}>Logout</Button>}
        </Container>
      </Navbar>
    </>
  )
}

export default BlogHeader