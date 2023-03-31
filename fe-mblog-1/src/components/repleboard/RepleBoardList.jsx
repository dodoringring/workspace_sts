import React, { useEffect, useState } from 'react'
import { qnaListDB } from '../../service/dbLogic'
//고려사항-상위 컴포넌트에서 하위 컴포넌트로만 props전달이 가능한점. 내려가는것만 가능하다. 
//일반적으로는 가급적 상위 컴포넌트에 두는 것을 추천함
//중급 - 하위 컴포넌트에서 일어난 상태 변화를 상위 컴포넌트에 반영할 수 있는 사람
//리렌더링과 관련-1,2,3가지 기억하기-미묘한 문제useEffect, useMemo, useCallback(함수),의존성 배열을 갖는다.
//[]-맨처음 딱 한번
//의존성 배열이 없으면 코딩할때마다 호출이 된다.
//의존성 배열에 입력한 변수가 바뀔때마다 호출-다중처리-주의 : 의존성 배열 자리는 전변만가능
const RepleBoardList = () => {
  const [board,setBoard]=useState({
    cb_gubun:'qna_title',
    keyword:'PT10회 회원 양도 합니다.'
  })
  const [boards, setBoards]=useState([{}])
  /*여기서 DB를 타야한다. ->promise사용(지연이 발생하니까)-> useEffect를 사용해서 렌더링 되는 시점을 제어 */
  useEffect(() => {//비동기처리 - async를 붙여야 await를 사용할 수 있음.

    const qnaList = async() => {//비동기 처리로 요청을 함
      const res = await qnaListDB(board)//async가 있을때만 await을 사용가능하다.
      console.log(res.data);
      setBoards(res.data)
    }
    qnaList()//호출
  },[board])

  return (
    <>
    {
      boards.map((item,index)=>(
        <tr key={index}>
          <td>{item.QNA_BNO}</td>
          <td>{item.QNA_TITLE}</td>
          <td>{item.MEM_NAME}</td>
          <td>{item.QNA_DATE}</td>
          <td>{item.QNA_HIT}</td>
        </tr>
        ))
      }
    </>
  )
}

export default RepleBoardList
