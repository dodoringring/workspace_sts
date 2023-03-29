import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  console.log('Profile');
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const getProfile = async () => {
    try{
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      })
      console.log(data)
      console.log(data.id)
      console.log(data.properties.nickname)
      console.log(data.properties.profile_image)
      //사용자 정보 변수에 저장
      setUserId(data.id);
      window.localStorage.setItem("userId", user_id)
      setNickName(data.properties.nickname);
      window.localStorage.setItem("nickname", nickName)
      setProfileImage(data.properties.profile_image);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProfile()
  })

  const kakaoLogout = async () => {
    //insert here 로그아웃 처리
    await axios({
      methos: "GET",
      url:`https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&logout_redirect_uri=http://localhost:3000`
    }).then(res => {
      console.log(res);
      window.localStorage.removeItem("userId")
      window.localStorage.removeItem("nickname")
      navigate("/home");
    }).catch(error => {//콜백에서 에러 발생시 사용
      console.log(error);
    })
  }
  return (
    <>
      Profile보기
      <h3>{user_id}</h3>
      <h3>{nickName}</h3>
      <img src={profileImage} alt="프로필 이미지"></img>
      <br/>
      <button onClick={kakaoLogout}>로그아웃</button>
    </>
  )
}

export default Profile
