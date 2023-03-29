import React from 'react'
import { useNavigate } from 'react-router-dom';
import BlogHeader from '../include/BlogHeader'
import KakaoMap from '../kakao/KakaoMap';
import {ContainerDiv, FormDiv, HeaderDiv} from '../styles/FormStyle';

const HomePage = () => {
  const member=window.localStorage.getItem('member')
  console.log(JSON.stringify(member));
  const jsonDoc=JSON.parse(member)
  console.log(jsonDoc.mem_id+','+jsonDoc.mem_pw);
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('login 요청');
    navigate('/login');
  }

  return (
    <>
      <ContainerDiv>
        <BlogHeader/>
          <HeaderDiv>
            <h2 style={{marginLeft:"10px"}}>보쌈 맛있겠다~!</h2>
            <button onClick={handleLogin}>로그인</button>
          </HeaderDiv>
          <FormDiv style={{textAlign:"center"}}>
            <div>이벤트존</div>
            <hr style={{height:"2px"}}/>
            <div>추천 수업</div>
            <hr style={{height:"2px"}}/>
            <div><KakaoMap/></div>
            <div>카카오맵</div>
            <hr style={{height:"2px"}}/>
          </FormDiv>
        </ContainerDiv>
    </>
  )
}

export default HomePage
