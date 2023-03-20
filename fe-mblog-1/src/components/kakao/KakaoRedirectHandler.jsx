import axios from 'axios'
import React from 'react'
import qs from 'qs'

const KakaoRedirectHandler = () => {
  //카카오 서버에서 돌려주는 URL뒤에 쿼리스트링 가져오기
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
    "https://kauth.kakao.com.oauth/token",
    payload
    )
  window.kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
  console.log(res.data.access_token);
  window.kakao.Auth.setAccessToken(res.data.access_token);
}catch(error){
  console.log(error);
}
  }
  return (
    <div>
      
    </div>
  )
}

export default KakaoRedirectHandler
