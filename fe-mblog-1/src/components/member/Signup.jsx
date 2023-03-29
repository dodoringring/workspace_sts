/* global daum */
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { memberInsertDB } from '../../service/dbLogic';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle'

//회원가입 페이지
const Signup = () => {//컴포넌트 함수
  //useXXXXX -> 훅Hook이라고 함 - 16.8 버전 - 그전까지는 클래스(this이슈 - 신입개발자)로 지원되던 것을 함수형 프로그래밍에 대한 이점으로 훅을 지원하게 되었다.
  const navigate = useNavigate();
  const [mem_uid, setMemuid] = useState('');//빈 문자열로 초기화
  const [mem_pw, setMempw] = useState('');
  const [mem_name, setMemname] = useState('');
  const [mem_nickname, setMemnickname] = useState('');
  const [mem_email, setMememail] = useState('');
  const [mem_tel, setMemtel] = useState('');
  const [mem_gender, setMemgender] = useState('');
  const [mem_birthday, setMembirthday] = useState('');
  const [mem_zipcode, setMemzipcode] = useState('');
  const [mem_addr, setMemaddr] = useState('');
  const [mem_addr_dtl, setMemaddr_dtl] = useState('');
  const [post, setPost] = useState({
    zipcode:'',
    addr:'',
    addrDetail:''
  })

  // Post, @RequestBody, {} -> (Map 객체 리터럴을 넘겼을 때 Map에서 받아주는지...) Map or VO (둘다 되는지) -> 비동기 처리 -> Promise(resolve, reject)를 생각해야...
  // async - await
  const memberInsert = async () => {
    const member = {
      mem_uid: mem_uid, mem_pw: mem_pw, mem_name: mem_name, mem_nickname: mem_nickname, mem_email: mem_email, mem_tel: mem_tel,
      mem_gender: mem_gender, mem_birthday: mem_birthday, mem_zipcode: mem_zipcode, mem_addr: mem_addr, mem_addr_dtl: mem_addr_dtl
    }
    console.log(member);
    const res = await memberInsertDB(member);
    console.log(res + ", " + res.data)
    if(!res.data){
      console.log("회원가입 실패")
    } else {
      console.log("회원가입 성공")
      //회원가입 성공시 로그인 화면으로 이동
      navigate("/login");
    }
  }

  //사용자가 입력한 값을 useState에 초기화하기
  const handleID = useCallback((e) => {
    setMemuid(e)
  },[])
  const handlePw = useCallback((e) => {
    setMempw(e)
  },[])
  const handleName = useCallback((e) => {
    setMemname(e)
  },[])
  const handleNickname = useCallback((e) => {
    setMemnickname(e)
  },[])
  const handleEmail = useCallback((e) => {
    setMememail(e)
  },[])
  const handleTel = useCallback((e) => {
    setMemtel(e)
  },[])
  const handleGender = useCallback((e) => {
    setMemgender(e)
  },[])
  const handleBirthday = useCallback((e) => {
    setMembirthday(e)
  },[])
  const handleZipcode = useCallback((e) => {
    setMemzipcode(e)
  },[])
  const handleAddr = useCallback((e) => {
    setMemaddr(e)
  },[])
  const clickAddr = (event) => {
    event.preventDefault();
    new daum.Postcode({
      oncomplete: function(data) {
          let addr = ''
          if(data.userSelectedType === 'R'){
            addr = data.roadAddress;//도로명
          } else {
            addr = data.jibunAddress;//지번
          }
          console.log(data); // 전체 주소정보 - 한글 + 영어
          console.log(addr); // 주소정보만
          //기존의 참조관계를 끊는다 - 
          setPost({...post, zipcode:data.zonecode, addr:addr}) //깊은 복사
          document.querySelector("#mem_zipcode").value = data.zonecode; //화면에 자동으로 입력처리를 하기 위해서
          document.querySelector("#mem_addr").value = addr;//선택한 주소정보를 input 컴포넌트에 자동입력처리
          document.querySelector("#mem_addr_dtl").focus();//addr이 입력되었을 때 커서 자동 이동처리
          setMemaddr(addr);
          setMemzipcode(data.zonecode);
      }
  }).open();
  }
  const handleAddrdtl = useCallback((e) => {
    setMemaddr_dtl(e)
  },[])

  return (
    <div>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>회원가입</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>아이디</span>
            </div>
            <input id="mem_uid" type="text" maxLength="50" placeholder="아이디를 입력하세요."
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleID(e.target.value)}}/>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>비밀번호</span> 
            </div>              
            <input id="mem_pw" type="text" maxLength="50" placeholder="비밀번호를 입력하세요."
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handlePw(e.target.value)}} />

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>비밀번호 확인</span>
            </div>
            <input id="mem_pw2" type="text" maxLength="50" placeholder="비밀번호를 입력하세요"
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} />

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>이름</span>
            </div>
            <input id="mem_name" type="text" maxLength="50" placeholder="이름을 입력하세요."
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleName(e.target.value)}} />

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>닉네임</span>
            </div>
            <input id="mem_nickname" type="text" maxLength="50" placeholder="닉네임을 입력하세요."
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleNickname(e.target.value)}} />

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>이메일</span>
            </div>
            <input id="mem_email" type="text" maxLength="50" placeholder="이메일을 입력하세요."
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleEmail(e.target.value)}} />
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>연락처</span>
            </div>
            <input id="mem_tel" type="text" maxLength="50" placeholder="연락처를 입력하세요."
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleTel(e.target.value)}} />
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>성별</span>
            </div>
            <input id="mem_gender" type="text" maxLength="50" placeholder="성별을 입력하세요."
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleGender(e.target.value)}} />
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>생년월일</span>
            </div>
            <input id="mem_birthday" type="text" maxLength="50" placeholder="생년월일을 입력하세요."
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleBirthday(e.target.value)}} />
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>우편번호</span>
            </div>
            <input id="mem_zipcode" type="text" maxLength="50" placeholder="우편번호를 입력하세요."
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleZipcode(e.target.value)}} />
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>주소</span>
            </div>
            <input id="mem_addr" type="text" maxLength="50" placeholder="주소를 입력하세요."
              style={{width:"350px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleAddr(e.target.value)}} />
            <BButton onClick={clickAddr}>주소검색</BButton>  

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <span>상세주소</span>
            </div>
            <input id="mem_addr_dtl" type="text" maxLength="50" placeholder="상세주소를 입력하세요." readOnly={post.addr?false:true}
              style={{width:"300px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleAddrdtl(e.target.value)}} />
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            </div>
            <BButton onClick={memberInsert}>가입</BButton>
          </div>
        </FormDiv>
      </ContainerDiv>
    </div>
  )
}

export default Signup
