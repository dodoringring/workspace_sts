import React from 'react'
import { useNavigate } from 'react-router-dom';
import { qnaDeleteDB } from '../../service/dbLogic';
import { BButton } from '../styles/FormStyle';

const RepleBoardHeader = ({detail, bno}) => {
  console.log(detail);
  console.log(bno);
  const navigate = useNavigate();
  
  const boardDelete = async() => {
    const board={
      qna_bno:bno,//mybatis xml에 코드 #{qna_bno} 소문자로 같이 맞춰줘야한다. 
    }
    const res=await qnaDeleteDB(board)
    //페이지 이동- 차이점 생각하기
    // window.location.replace();
    navigate("/qna/list?page=1")
  }
  const qnaList = () => {
    //파라미터로 받은 페이지번호가 돌아갈 페이지 정보이다.
    navigate("/qna/list?page=1");
  }
  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{display: 'flex', justifyContent:"space-between"}}>
          <div style={{overflow: "auto"}}>
            <span style={{marginBottom:'15px', fontSize: "30px", display:"block"}}>
              {detail.QNA_TITLE}
            </span>
          </div>
          {
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <BButton style={{margin:'0px 10px 0px 10px'}} onClick={()=>{navigate(`/qna/update/${bno}`)}}>
                수정
              </BButton>
              <BButton style={{margin:'0px 10px 0px 10px'}} onClick={()=>{boardDelete()}}>
                삭제
              </BButton>
              <BButton style={{margin:'0px 10px 0px 10px'}} onClick={qnaList}>
                목록
              </BButton>
            </div>
          }
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span>작성자 : {detail.MEM_NAME}</span>
            <span>작성일 : {detail.QNA_DATE}</span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', marginRight:'10px'}}>
            <div style={{display: 'flex'}}>
              <span style={{marginRight:'5px'}}>조회수 :</span>
              <div style={{display: 'flex', justifyContent: 'flex-end', width:'30px'}}>{detail.QNA_HIT}</div>
            </div>
            <div style={{display: 'flex'}}>
              {detail.COMMENT?<>
                <span style={{marginRight:'5px'}}>댓글수 :</span>
                <div style={{display: 'flex', justifyContent: 'flex-end', width:'30px'}}>{detail.COMMENT}</div>
              </>:<></>}
            </div>
          </div>
        </div>
      </div>
      <hr style={{height: '2px'}}/>
    </div>
  )
}

export default RepleBoardHeader