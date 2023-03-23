import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ImageUploader from './service/imageUploader';
import "bootstrap/dist/css/bootstrap.min.css";//있어야 navbar디자인 들어간다.
import "@fortawesome/fontawesome-free/js/all.js"
//리덕스 추가-Store생성 외부에서 상태(데이터) 관리
//creatStore호출
//이미지 업로더 객체를 생성-props로 넘겨야
const imageUploader=new ImageUploader();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter>
    <App imageUploader={imageUploader} />{/* props로 App에 넘김 */}
  </BrowserRouter>
  </>
);
