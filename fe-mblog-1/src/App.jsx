import { Route, Routes, useNavigate } from 'react-router-dom';
// import LoginPage from './components/auth/LoginPage';
import KakaoRedirectHandler from './components/kakao/KakaoRedirectHandler';
import Profile from './components/kakao/Profile';
import MemberPage from './components/page/MemberPage';
import HomePage from './components/page/HomePage';
import DeptPage from './components/page/DeptPage';
import DeptDetail from './components/dept/DeptDetail';
import RepleBoardPage from './components/page/RepleBoardPage';
import Signup from './components/member/Signup';
import SignupPage from './components/auth/SignupPage';
import Toast from './components/Toast'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setToastMsg } from './redux/toastStatus/action';
import KhLoginPage from './components/auth/KhLoginPage';
import { onAuthChange } from './service/authLogic';
import { memberListDB } from './service/dbLogic';

function App({authLogic, imageUploader}) {
  const navigate=useNavigate();
  const dispatch = useDispatch()
  const ssg=sessionStorage;
  const toastStatus = useSelector(state => state.toastStatus)
  useEffect(() => {
    const asyncDB=async()=>{
      const auth=authLogic.getUserAuth()
      //현재 인증된 사용자 정보를 가져온다.
      const user=await onAuthChange(auth)
      //사용지가 있으면 - userId가 있다
      //구글 로그인으로 사용자 정보를 가지고 있을때
      if(user){
        console.log('user정보가 있을때');
        ssg.setItem('email',user.email)
        const res=await memberListDB({MEM_ID:user.uid, type:'auth'})
        //오라클 서버의 회원집합에 uid가 존재하면-세션 스토리지에 값을 담자
        if(res.data){
          const temp =JSON.stringify(res.data)
          const jsonDoc=JSON.parse(temp)
          ssg.setItem('nickname',jsonDoc[0].MEM_NICKNAME)
          ssg.setItem('status',jsonDoc[0].MEM_STATUS)
          ssg.setItem('auth',jsonDoc[0].MEM_AUTH)
          ssg.setItem('no',jsonDoc[0].MEM_NO)
          navigate("/")
          return;//렌더링이 종료됨 중요함!!
        }
        //구글 로그인을 했지만 false일때 
        // if(){

        // }
        //오라클 서버의 회원집합에 uid가 존재하지 않으면
        else{

        }
      }
      //사용자 정보가 없을때
      else{
        console.log('user정보가 없을때')
        if(ssg.getItem(user.email)){
          //세션 스토리지에 있는 값 모두 삭제하기
          ssg.clear()
          window.location.reload()
        }
      }
    }

  },[dispatch])
  return (
    <>
      <div style={{height:'100vh'}}>
        {toastStatus.status && <Toast />}
        <Routes>
          <Route path='/login' exact={true} element={<KhLoginPage authLogic={authLogic}/>} />
          <Route path='/' exact={true} element={<HomePage/>}/>
          <Route path='/auth/signup' exact={true} element={<SignupPage authLogic={authLogic}/>}/>
          {/* <Route path='/dept' element={<DeptPage imageUploader={imageUploader}/>}/> */}
          <Route path='/repleboard' element={<RepleBoardPage/>}/>
          <Route path='/dept/:gubun' element={<DeptPage imageUploader={imageUploader}/>}/>
          {/* 컴포넌트 함수를 호출하는 것이다 - 렌더링(마운트-화면에 나타나는것) - 그 컴포넌트가 가진 return이 호출됨 그 호출을 바꾸는 애가 useState/props/부모컴포넌트의 변경 */}
          <Route path='/deptdetail/:deptno' element={<DeptDetail imageUploader={imageUploader}/>}/>{/* deptno -> 스프링에서는 pathvariable? 저걸 리액트에서 받아주는 애는 useParams */}
          {/* 눈에 보이지 않아도 KakaoRedirectHandler 추가해주기 */}
          <Route path='/auth/kakao/callback' exact={true} element={<KakaoRedirectHandler/>}/>
          <Route path='/member' exact={true} element={<MemberPage imageUploader={imageUploader} />}/>
          <Route path='/profile' exact={true} element={<Profile />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
