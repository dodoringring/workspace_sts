import React from 'react'
import { useCallback } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { qnaInsertDB } from '../../service/dbLogic';
import BlogFooter from '../include/BlogFooter';
import BlogHeader from '../include/BlogHeader';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle';
import MyFilter from './KhMyFilter';
import QuillEditor from './QuillEditor';
import RepleBoardFileInsert from './RepleBoardFileInsert';

const KhQnAWritePage = ({authLogic}) => {
  const navigate=useNavigate();

  const[title, setTitle]= useState('');
  const[content, setContent]= useState('');//내용작성
  const[secret, setSecret]= useState(false);//비밀글
  const[tTitle, setTTitle]= useState('일반');//qna_type
  const[types]= useState(['일반','결제','양도','회원','수업']);//qna_type의 라벨값
  const[files, setFiles]= useState([]);//파일처리
  const quillRef = useRef();


  const handleContent = useCallback((value) => {
    console.log(value);
    setContent(value);
  },[]);


  const handleFiles = useCallback((value) => {//파일이 새로 들어올때마다 useCallback이 처리된다.
    setFiles([...files, value]);//깊은복사. ...스프레드연산자-새로 만들어진 카피
  },[files]);//[m.png, m1.png, m2.png]


  const handleTitle = useCallback((e) => {
    setTitle(e);
  },[]);

  const handleTTitle = useCallback((e) => {
    setTTitle(e);
  },[]);

  const qnaInsert = async() => {//post로 처리
    console.log('qnaInsert');
    console.log(secret);
    console.log(typeof secret);//boolean타입 출력
    const board={
      qna_title:title,
      qna_content:content,
      qna_secret:(secret?'true':'false'),
      qna_type:tTitle,
      mem_no:sessionStorage.getItem('no'),
      fileNames:files
    }//사용자가 입력한 값 넘기기-@RequestBody로 처리됨
    const res=await qnaInsertDB(board)
    console.log(res.data)
    //성공시 페이지 이동 처리하기
    // window.location.replace('/qna/list?page=1')
    navigate("/qna/list");
  }
    
  return (
    <>
      <BlogHeader authLogic={authLogic} />
      <ContainerDiv>
        <HeaderDiv>
          <h3>QNA 글작성</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'10px'}}>
              <h2>제목</h2> 
              <div style={{display: 'flex'}}>
                <div style={{display: 'flex', flexDirection: 'column', marginRight:'10px', alignItems: 'center'}}>
                  <span style={{fontSize: '14px'}}>비밀글</span> 
                  <Form.Check type="switch" id="custom-switch" style={{paddingLeft: '46px'}} 
                    onClick={()=>{setSecret(!secret)}}/>
                </div>
                <MyFilter title={tTitle} types={types} handleTitle={handleTTitle}></MyFilter>
                <BButton style={{marginLeft:'10px'}}onClick={()=>{qnaInsert()}}>글쓰기</BButton>
              </div>
            </div>
            <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요."
            style={{width:"100%",height:'40px' , border:'1px solid lightGray'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
            <hr style={{margin:'10px 0px 10px 0px'}}/>
            <h3>상세내용</h3>
            <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} files={files} handleFiles={handleFiles}/>
            <RepleBoardFileInsert files={files}/>
          </div>
        </FormDiv>
      </ContainerDiv>
      <BlogFooter />
    </>
  );

};

export default KhQnAWritePage;