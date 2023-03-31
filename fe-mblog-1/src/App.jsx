import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import KakaoRedirectHandler from './components/kakao/KakaoRedirectHandler';
import Profile from './components/kakao/Profile';
import MemberPage from './components/page/MemberPage';
import HomePage from './components/page/HomePage';
import DeptPage from './components/page/DeptPage';
import DeptDetail from './components/dept/DeptDetail';
import RepleBoardPage from './components/page/RepleBoardPage';
import Toast from './components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setToastMsg } from './redux/toastStatus/action';
import SignupPage from './components/auth/SignupPage';
import KhLoginPage from './components/auth/KhLoginPage';
import { onAuthChange } from './service/authLogic';
import { memberListDB } from './service/dbLogic';
import EmailVerifiedPage from './components/auth/EmailVerifiedPage';
import FindEmailPage from './components/auth/FindEmailPage';
import ResetPwdPage from './components/auth/ResetPwdPage';
import RepleBoardWriteForm from './components/repleboard/RepleBoardWriteForm';
import RepleBoardDetail from './components/repleboard/RepleBoardDetail';

function App({authLogic, imageUploader}) {
//회면을 전환시킬때-window.location.href차이점 알고있니?-새로고침 요청을 발생시키는것이다. 가상의 돔을 사용하지 않는다.
  const navigate = useNavigate()//가상의 돔이 사용 됨
  const dispatch = useDispatch()//허브 - action.type(switch문-선택), action.payload(내용)
  const ssg = sessionStorage;
  const toastStatus = useSelector(state => state.toastStatus)//store에 값을 접근할때
  useEffect(() => {//의존성 배열-의존성 배열에 있는 변수가 함수가 훅이 변할때 마다 다시 호출 가능함.
    const asyncDB = async() => {//함수선언-memberListDB호출
      console.log('asyncDB');
      const auth = authLogic.getUserAuth()
      // 현재 인증된 사용자 정보를 가져온다
      const user = await onAuthChange(auth)
      // 사용자가 있을 경우(userId가 존재) - 구글 로그인으로 사용자 정보를 가지고 있을 때
      // user정보가 있으면 sessionStorage에 담는다 - email
      if(user) {
        console.log('user정보가 있을 때')
        //세션 스토리지에 이메일 주소가 등록됨-단, 구글 로그인이 되어있는 상태일때만
        ssg.setItem('email', user.email)
        const res = await memberListDB({mem_uid: user.uid, type: 'auth'})
        console.log(res.data)
        //오라클 서버의 회원집합에 uid가 존재할 경우 - 세션스토리지에 값을 담는다
        if(res.data !== 0) { // 스프링 부트 - RestMemberController - memberList() -> 0 혹은 [{}]
          const temp = JSON.stringify(res.data)
          const jsonDoc = JSON.parse(temp)
          ssg.setItem('nickname', jsonDoc[0].MEM_NICKNAME)
          ssg.setItem('status', jsonDoc[0].MEM_STATUS)
          ssg.setItem('auth', jsonDoc[0].MEM_AUTH)
          ssg.setItem('no', jsonDoc[0].MEM_NO)
          //navigate("/")
          return // 렌더링이 종료됨
        }
        // 구글 계정이 아닌 다른 계정으로 로그인 시도를 했을 땐 user.emailVerified가 없다
        // -> undefined
        if(!user.emailVerified) {
          navigate('./auth/emailVerified')
        }
        //오라클 서버의 회원집합에 uid가 존재하지 않을 경우 
        else {
          console.log('가입되지 않은 구글 계정입니다.')
          //navigate('/auth/signup')
        }
      }
      // 사용자 정보가 없을 경우
      else {
        console.log('user정보가 없을 때')
        if(ssg.getItem('email')){
          // 세션 스토리지에 있는 값 모두 삭제하기
          ssg.clear()
          window.location.reload()
        } // end of inner if
      } // end of else
    }
    asyncDB()
  }, [dispatch])//디스패치 즉, 의존성 배열이 바뀔 때 마다 함수호출이 일어난다.

  return (
    <>
      <div style={{height: '100vh'}}>
        {toastStatus.status && <Toast />}
        <Routes>
          <Route path='/login' exact={true} element={<KhLoginPage authLogic={authLogic} />} />
          <Route path='/' exact={true} element={<HomePage />} />
          <Route path='/home' exact={true} element={<HomePage />} />
          <Route path='/auth/signup' exact={true} element={<SignupPage authLogic={authLogic} />} />
          <Route path='/auth/emailVerified' exact={true} element={<EmailVerifiedPage authLogic={authLogic} />} />
          <Route path='/auth/findEmail' exact={true} element={<FindEmailPage />} />
          <Route path='/auth/resetPwd' exact={true} element={<ResetPwdPage authLogic={authLogic} />} />
          <Route path='/reple/board' exact={true} element={<RepleBoardPage />} />
          <Route path='/reple/boarddetail/*' element={<RepleBoardDetail />} />
          <Route path='/reple/boardwrite' exact={true} element={<RepleBoardWriteForm />} />
          <Route path='/dept/:gubun' element={<DeptPage imageUploader={imageUploader} />} />
          {/* 컴포넌트 함수를 호출하는 것이다 - 마운트(화면이 보여지는 것) - return이 호출되었다 */}
          <Route path='/deptdetail/:deptno' element={<DeptDetail imageUploader={imageUploader} />} />
          <Route path='/auth/kakao/callback' exact={true} element={<KakaoRedirectHandler />} />
          <Route path="/member" exact={true} element={<MemberPage imageUploader={imageUploader} />} />
          <Route path="/profile" exact={true} element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;