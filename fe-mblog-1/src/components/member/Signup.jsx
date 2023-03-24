import React, { useCallback, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import { memberInsertDB } from '../../service/dbLogic'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../styles/FromStyle'

//회원가입 페이지
const Signup = () => {//컴포넌트 함수
//useXXXX은 훅이라고 한다. - 16.8버전- 그 전까지는 클래스(this이슈. 변함) 지원되던것을
//함수형 프로그래밍에 대한 이점으로 훅을 지원하게 되었다.
  const navigate=useNavigate();
  const [mem_uid,setMemuid]=useState('')
  const [mem_pw,setMempw]=useState('')
  const [mem_name,setMemname]=useState('')
  const [mem_nickname,setMemnickname]=useState('')
  const [mem_email,setMememail]=useState('')
  const [mem_tel,setMemtel]=useState('')
  const [mem_gender,setMemgender]=useState('')
  const [mem_birthday,setMembirthday]=useState('')
//POST로 처리, @RequestBody, {} 객체 리터럴로 넘겼을때 Map or VO로 받을 수 있는지...->비동기처리(순서대로 처리X) 오래걸리는것부터 먼저..뒤죽박죽
//->Promise(resolve, reject)
//async-await 비동기로 처리할때 꼭 사용
const memberInsert= async ()=>{
  const member={
    mem_uid:mem_uid,
    mem_pw:mem_pw,
    mem_name: mem_name,
    mem_nickname:mem_nickname,
    mem_email:mem_email,
    mem_tel:mem_tel,
    mem_gender:mem_gender,
    mem_birthday:mem_birthday
  }
  const res= await memberInsertDB(member)
  console.log(res+","+res.data);
  if(!res.data){
    console.log('회원가입실패');
  }else{
    console.log('회원가입성공');
    navigate("/login");
  }

}

  const handleID=useCallback((e)=>{
    setMemuid(e)
  },[])

  const handlePW=useCallback((e)=>{
    setMempw(e)
  },[])

  const handleName=useCallback((e)=>{
    setMemname(e)
  },[])

  const handleNickname=useCallback((e)=>{
    setMemnickname(e)
  },[])

  const handleEmail=useCallback((e)=>{
    setMememail(e)
  },[])

  const handleTel=useCallback((e)=>{
    setMemtel(e)
  },[])

  const handleGender=useCallback((e)=>{
    setMemgender(e)
  },[])

  const handleBirthday=useCallback((e)=>{
    setMembirthday(e)
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
              <h4>아이디</h4> 
            </div>
            <input id="mem_uid" type="text" maxLength="50" placeholder="아이디를 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e) => {handleID(e.target.value)}}/>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}} >
              <h4>비밀번호</h4> 
            </div>
            <input id="mem_pw" type="text" maxLength="50" placeholder="PW를 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e) => {handlePW(e.target.value)}} />
           
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>비밀번호확인</h4> 
            </div>
            <input id="mem_pw2" type="text" maxLength="50" placeholder="PW를 확인하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}}/>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>이름</h4> 
            </div>
            <input id="mem_nickname" type="text" maxLength="50" placeholder="이름을 확인하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e) => {handleName(e.target.value)}} />
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>닉네임</h4> 
            </div>
            <input id="mem_nickname" type="text" maxLength="50" placeholder="닉네임을 확인하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e) => {handleNickname(e.target.value)}} />
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>이메일</h4> 
            </div>              
            <input id="mem_email" type="text" maxLength="50" placeholder="이메일을 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e) => {handleEmail(e.target.value)}} />
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>전화번호</h4> 
            </div>              
            <input id="mem_tel" type="text" maxLength="50" placeholder="전화번호를 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e) => {handleTel(e.target.value)}} />

            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>성별</h4> 
            </div>              
            <input id="mem_gender" type="text" maxLength="50" placeholder="성별을 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e) => {handleGender(e.target.value)}} />
            
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>생일</h4> 
            </div>              
            <input id="mem_birthday" type="text" maxLength="50" placeholder="생일을 입력하세요."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e) => {handleBirthday(e.target.value)}} />
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
            <Button onClick={memberInsert} >회원가입</Button>
            </div>
          </div>
        </FormDiv>
      </ContainerDiv>
    </div>
  )
}

export default Signup