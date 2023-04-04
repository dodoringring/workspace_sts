import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle';
import RepleBoardHeader from './RepleBoardHeader';
import { qnaListDB } from '../../service/dbLogic';
import BlogHeader from '../include/BlogHeader';
import BlogFooter from '../include/BlogFooter';

const KhQnADetailPage = ({authLogic}) => {
  const search = window.location.search;
  console.log(search);
  const page = search.split('&').filter((item)=>{return item.match('page')})[0]?.split('=')[1];
  console.log(page);
  const bno = search.split('&').filter((item)=>{return item.match('bno')})[0]?.split('=')[1];
  console.log(bno);
  const [detail, setDetail] = useState({});
  const[files, setFiles]= useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const boardDetail = async() => {
      const board = {
        qna_bno : bno
      }
      //상세보기 페이지에서는 첨부파일이 있는 경우에 fileList 호출 해야 함
      //qnaListDB에서는 qna_bno를 결정 지을 수 없다.
      const res = await qnaListDB(board);
      console.log(res.data);//빈배열만 출력됨
      //shift는 배열에서 첫 번째 요소를 제거하고, 제거된 요소를 반환합니다
      const bTemp = res.data.shift();
      console.log(bTemp);
      console.log(bTemp);
      console.log(bTemp.QNA_TITLE);
      console.log(bTemp.QNA_CONTENT);
      console.log(bTemp.MEM_NAME);
      console.log(bTemp.MEM_NO);
      console.log(bTemp.QNA_DATE);
      console.log(bTemp.QNA_HIT);
      console.log(JSON.parse(bTemp.QNA_SECRET));
      if(JSON.parse(bTemp.QNA_SECRET)){
        if(sessionStorage.getItem('auth')!=='3'&&sessionStorage.getItem('no')!==JSON.stringify(bTemp.MEM_NO)) {
          //navigate(`/qna/list?page=1`);
          //return dispatch(setToastMsg("권한이 없습니다.")); 
        }
      }
      setDetail({
        QNA_TITLE : bTemp.QNA_TITLE,
        QNA_CONTENT : bTemp.QNA_CONTENT,
        MEM_NAME : bTemp.MEM_NAME,
        MEM_NO : bTemp.MEM_NO,
        QNA_DATE : bTemp.QNA_DATE,
        QNA_HIT : bTemp.QNA_HIT,
        QNA_SECRET : JSON.parse(bTemp.QNA_SECRET),
        QNA_TYPE : bTemp.QNA_TYPE,
      });
    }
    boardDetail();
  },[setDetail, setFiles , bno, dispatch, navigate])

  
  return (
    <>
      <BlogHeader authLogic={authLogic}/>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>QnA 게시글</h3>
        </HeaderDiv>
        <FormDiv>
          <RepleBoardHeader detail={detail} bno={bno}/>
          <section style={{minHeight: '400px'}}>
            <div dangerouslySetInnerHTML={{__html:detail.QNA_CONTENT}}></div>
          </section>
          {/* <RepleBoardFileDetail files={files}/> */}
          <hr style={{height:"2px"}}/>
        </FormDiv>
      </ContainerDiv>
      <BlogFooter />
    </>
  );
};

export default KhQnADetailPage;