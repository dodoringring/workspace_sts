import React from 'react'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';

const LoginPage2 = () => {
  const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  return (
    <>
      <div>
        <a href={KAKAO_AUTH_URL}>
        <Image src='/images/kakao/kakao_login_medium_wide.png' /></a>
      </div>
      <Link to={"/member/signup"} className="btn btn-primary">회원가입</Link>
    </>
  )
}

export default LoginPage2
