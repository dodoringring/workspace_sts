import React from 'react'
import { Button, Table } from 'react-bootstrap';
import BlogFooter from '../include/BlogFooter';
import BlogHeader from '../include/BlogHeader';

const boardSearch=()=>{
  
}

const RepleBoardPage = () => {

  return (
    <>
      <BlogHeader/>
      <div className="container">
      <div className="page-header">
      <h2>댓글형 게시판&nbsp;<i className="fa-solid fa-angles-right"></i>&nbsp;<small>글목록</small></h2>
        <hr />
	    </div>      
      <div className="row">
        <div className="col-3">
          <select id="gubun" className="form-select" aria-label="분류선택">
            <option defaultValue>분류선택</option>
            <option value="b_no">글번호</option>
            <option value="b_title">제목</option>
            <option value="b_content">내용</option>
          </select>			
        </div>
		    <div className="col-6">
			    <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" 
                 aria-label="검색어를 입력하세요" aria-describedby="btn_search" />
		    </div>
		    <div className="col-3">
			    <Button variant='danger' id="btn_search" onClick={boardSearch}>검색</Button>
		    </div>
	     </div> 
      <div className='book-list'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>글번호</th>
              <th>재목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td>댓글형게시판구현</td>
                <td>관리자</td>
                <td></td>
            </tr>
            </tbody>
          </Table> 
          <hr />    
          <div className='booklist-footer'>
            <Button variant="warning" >
            전체조회
            </Button>&nbsp; 
            <Button variant="success" >
              글쓰기
            </Button> 
          </div>
        </div>
      </div>
       {/* ========================== [[ 글쓰기 Modal ]] ========================== */}
       
      {/* ========================== [[ 글쓰기 Modal ]] ========================== */}  
      <BlogFooter/>
    </>
  )
}

export default RepleBoardPage
