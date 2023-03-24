import { Route, Routes } from 'react-router-dom';
import MemberPage from './components/page/MemberPage';
import LoginPage from './components/auth/LoginPage';
import KakaoRedirectHandler from './components/kakao/KakaoRedirectHandler';
import Profile from './components/kakao/Profile';
import HomePage from './components/page/HomePage'
import DeptPage from './components/page/DeptPage';
import DeptDetail from './components/dept/DeptDetail';
import RepleBoardPage from './components/page/RepleBoardPage';
import Signup from './components/member/Signup';

function App({imageUploader}){
  return (
    <>
  <Routes>
  <Route path='/' exact={true} element={<LoginPage/>}/>
  <Route path='/home' exact={true} element={<HomePage/>}/>
  <Route path='/member/signup' exact={true} element={<Signup/>}/>
  <Route path='/repleboard' element={<RepleBoardPage/>}/>
  <Route path='/dept/:gubun'element={<DeptPage imageUploader={imageUploader} />}/>
  {/*컴포넌트 함수를 호출 하는것이다.-마운트(화면에 나타남)-return이 호출 되었다.*/ }
  <Route path='/deptdetail/:deptno' element={<DeptDetail imageUploader={imageUploader} />}/>
  <Route path='/auth/kakao/callback' exact={true} element={<KakaoRedirectHandler/>}/>
  <Route path='/member' exact={true} element={<MemberPage imageUploader={imageUploader} />}/>
  <Route path='/profile' exact={true} element={<Profile />}/>
  </Routes>
    </>
  )
}

export default App;
