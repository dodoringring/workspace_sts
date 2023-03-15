import React, { useEffect, useState } from 'react'
import { jsonMemberListDB } from '../../service/dbLogic'

const MemberPage = () => {
  const [member,setMember]=useState({})

  useEffect(()=>{
    const memberList=async()=>{
      const res=await jsonMemberListDB(member)
      console.log(res.data);
    }
    memberList()
  },[])
  return (
    <div>
      회원관리페이지입니다.
    </div>
  )
}

export default MemberPage
