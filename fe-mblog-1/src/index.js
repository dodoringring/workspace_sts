import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "react-quill/dist/quill.snow.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ImageUploader from "./service/imageUploader";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "./redux/rootReducer";
import AuthLogic from "./service/authLogic";
import firebaseApp from "./service/firebase";
import { setAuth } from "./redux/userAuth/action";

//리덕스 적용하기~~~  store 생성
const store = legacy_createStore(rootReducer);
//AuthLogic 객체 생성하기
const authLogic = new AuthLogic(firebaseApp);
//store에 있는 초기 상태 정보 출력하기
store.dispatch(
  setAuth(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider())
);
console.log(store.getState());

//이미지 업로더 객체 생성
const imageUploader = new ImageUploader();
const root = ReactDOM.createRoot(document.getElementById("root"));
//리덕스 추가 - store 생성(외부에서 상태-데이터-를 관리)
//createStore 호출
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App authLogic={authLogic} imageUploader={imageUploader} />
      </BrowserRouter>
    </Provider>
  </>
);
