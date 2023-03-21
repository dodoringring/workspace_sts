/* global kakao */
import axios from 'axios'
import React, { useEffect } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

const KakaoRedirectHandler = () => {
  //카카오 객체를 global variable에 등록해주는 코드
  // const {Kakao}=window;
  const navigate=useNavigate();
    //카카오 서버에서 돌려주는 URL뒤의 쿼리스트링 가져오기 - mdn searchParams ~ JS/restAPI방식으로 받아올 때 사용하는 방식
  //서블릿 - request.getParameter("code"); ~ 백에서 가져올 때는 저런 식으로 해서 가져올 수 있음.
  //http://localhost:3000/auth/kakao/callback
  //?code=bLaYCGPB-1oERAWWIQujkYuU5mUTCyX0pmPNfddNBfJMFBzG-AbV_xOx_ZoIOtQpmZ42pQoqJREAAAGHAaBsIw
  
  let params=new URL(document.location).searchParams;
  let code=params.get("code");
  console.log(code);
  const grant_type="authorization_code"
  const redirect_uri="http://localhost:3000/auth/kakao/callback"
  const getToken=async ()=>{
    const payload=qs.stringify({
      grant_type: grant_type,
      client_id:process.env.REACT_APP_KAKAO_API_KEY,
      redirect_uri:redirect_uri,
      code:code
    })
  try{
    const res= await axios.post(
    "https://kauth.kakao.com/oauth/token",
    payload
    )
  window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
  console.log(res.data.access_token);
  window.Kakao.Auth.setAccessToken(res.data.access_token);
  navigate("/profile")
  /* 이렇게 오는 값은 반드시 라우터에 등록이 되어있어야한다. */
}catch(error){
  console.log(error);
}
  }
  useEffect(()=>{
    getToken();
  })
  return (
    <div>
      {/* 아무런 의미 없는 화면이다-거쳐서 다른 화면으로 이동하니까-루트컨텍스트-인증이 되면 /home으로 가자 */}
      {code}
    </div>
  )
}

export default KakaoRedirectHandler
