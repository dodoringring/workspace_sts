import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import BlogHeader from '../include/BlogHeader';
import { ContainerDiv, FormDiv, HeaderDiv } from '../styles/FromStyle';
import KakaoMap from '../kakao/KakaoMap';


const HomePage = () => {
  return (
    <>
      <ContainerDiv>
        <BlogHeader/>
          <HeaderDiv>
            <h2 style={{marginLeft:"10px"}}>로그인 성공 후 이동 페이지</h2>
          </HeaderDiv>
          <FormDiv style={{textAlign:'center'}}>
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

export default HomePage;