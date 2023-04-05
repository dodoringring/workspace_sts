import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { qnaDetailDB, qnaUpdateDB } from '../../service/dbLogic';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle';
import KhMyFilter from './KhMyFilter';
import QuillEditor from './QuillEditor';

const KhQnAUpdatePage = ({authLogic}) => {
  const navigate=useNavigate();
  //해시값으로 가져오기 OR 쿼리스트링 가져오기 OR props로 가져오기
  const {bno} = useParams()
  console.log(bno);//글번호 가져오는지 확인하기
  const[title, setTitle]= useState('');
  const[content, setContent]= useState('');
  const[files, setFiles]= useState([]);
  const[secret, setSecret]= useState(false);
  const[tTitle, setTTitle]= useState('일반');
  const[types]= useState(['일반','결제','양도','회원','수업']);
  const quillRef = useRef();


  useEffect(() => {
    //한 건 가져오기
    const qnaDetail=async()=>{
      const board={
        qna_bno:bno,
      }
      const res=await qnaDetailDB(board);
      console.log(res.data);
      const temp=JSON.stringify(res.data)//문자열로 전환
      const jsonDoc=JSON.parse(temp)//배열로 접근처리
      setTitle(jsonDoc[0].QNA_TITLE)
      setContent(jsonDoc[0].QNA_CONTENT)
      //여기서 parse 는 'true"를 boolean true변경
      setSecret(JSON.parse(jsonDoc[0].QNA_SECRET))//문자열로 가지고 오면 안된다. boolean으로 바꿔준다?
      setTTitle(jsonDoc[0].QNA_TYPE)
      //작성자가 아닌데 수정해도 되나?  힌트는 세션 스토리지의 값과 디비의 값이 같으면 작성자
      if(jsonDoc[0].MEM_NO!=sessionStorage.getItem("no")){//글의 회원번호와 로그인 한 no가 달라?네->다른사람
        return console.log('작성자만 수정가능합니다.');
      }
    }
    qnaDetail()
  },[bno]);//bno가 바뀔때 마다 새로 리렌더링...
  

  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  },[]);


  const handleFiles = useCallback((value) => {
    setFiles([...files, value]);
  },[files]);


  const handleTitle = useCallback((e) => {
    setTitle(e);
  },[]); 

  const handleTTitle = useCallback((e) => {
    setTTitle(e);
  },[]);

  const boardUpdate = async() => {
    if(title.trim()==="||content.trim()===")return console.log('게시글이 수정안됨');
    const board={
      qna_bno:bno,
      qna_title:title,//일반 변수가 아니다. useState훅이다
      qna_content:content,
      qna_secret:(secret?'true':'false'),
      qna_type:tTitle,
    }
    const res=await qnaUpdateDB(board)
    if(!res.data) return console.log('게시판 수정에 실패하였습니다.');
    navigate("/qna/list?page=1");
  }



  return (
    <>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>QNA 글수정</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'10px'}}>
              <h2>제목</h2> 
              <div style={{display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column', marginRight:'10px', alignItems: 'center'}}>
                  <span style={{fontSize: '14px'}}>비밀글</span> 
                  <Form.Check type="switch" id="custom-switch" checked={secret===true?true:false} readOnly
                    style={{paddingLeft: '46px'}} onClick={()=>{setSecret(!secret)}}/>
                </div>
                <KhMyFilter types={types} id={"qna_type"} title={tTitle} handleTitle={handleTTitle}></KhMyFilter>
                <BButton style={{marginLeft: '10px'}} onClick={()=>{boardUpdate()}}>글수정</BButton>
              </div>
            </div>
            <input id="dataset-title" type="text" placeholder="제목을 입력하세요." defaultValue={title}
              style={{width:"100%",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
            <hr />
            <h3 style={{textAlign:"left", marginBottom:'10px'}}>상세내용</h3>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} files={files} handleFiles={handleFiles}/>
          </div>
        </FormDiv>
      </ContainerDiv>
    </>
  );
};

export default KhQnAUpdatePage