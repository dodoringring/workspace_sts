import './App.css';
import { Route, Routes } from 'react-router-dom';
import MemberPage from './components/page/MemberPage';
import LoginPage from './components/auth/LoginPage';
import KakaoRedirectHandler from './components/kakao/KakaoRedirectHandler';

function App({imageUploader}){
  return (
    <>
  <Routes>
  <Route path='/' exact={true} element={<LoginPage/>}/>
  <Route path='/auth/kakao/callback' exact={true} element={<KakaoRedirectHandler/>}/>
  <Route path='/member' exact={true} element={<MemberPage imageUploader={imageUploader} />}/>
  </Routes>
    </>
  )
}

export default App;
