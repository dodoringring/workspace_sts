import React, { useEffect, useState } from 'react'
import { jsonMemberListDB } from '../../service/dbLogic'
// import ImageUploader from '../../service/imageUploader'

const MemberPage = ({imageUploader}) => {
  const [member,setMember]=useState({})

  useEffect(()=>{
    const memberList=async()=>{
      const res=await jsonMemberListDB(member)
      console.log(res.data);
    }
    memberList()
  },[])
  //async는 비동기 처리시 사용
  const imgChange=async(event)=>{
    console.log(event.target.files[0]);
    //async가 붙은 함수안에서만 await을 사용할 수 있음-파일이 업로드 될 때 까지 기다림
    const uploaded=await imageUploader.upload(event.target.files[0])
    //-선택한 이밎의 싱제 아이디가 아닌 COULDINARY
    console.log(`${uploaded.public_id} ${uploaded.format} ${uploaded.url}`);
  }
  return (
    <>
      <h3>회원관리페이지입니다.</h3>
      <input type="file" name="mimg" id="mimg" onChange={imgChange} />
    </>
  )
}

export default MemberPage
