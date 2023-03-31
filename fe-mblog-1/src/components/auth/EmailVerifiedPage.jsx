import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout, sendEmail } from '../../service/authLogic';
import { MyButton, SignupForm } from '../styles/FormStyle';

const EmailVerifiedPage = ({authLogic}) => {

  const navigate = useNavigate();
  const auth = authLogic.getUserAuth();
  const send = async() => {
    //const user = await onAuthChange(userAuth.auth);
    const msg = await sendEmail(auth.currentUser);
    console.log(msg);
  }

  const out = async() => {
    await logout(auth);
    navigate('/');
  }


  return (
    <>
      <SignupForm style={{marginTop : '100px'}}>
        <h4>{sessionStorage.getItem('nickname')} 회원님의 이메일은 아직 사용할 수 없습니다.</h4>
        <p>
          해당 이메일함에서 인증 메일을 확인해주세요.
        </p>
        <div style={{display: 'flex', width: '50%', justifyContent: 'space-between'}}>
          <MyButton type="button" onClick={()=>{ send(); }} variant="secondary">이메일 재전송</MyButton>
          <MyButton type="button" onClick={()=>{ navigate('/'); window.location.reload();}} variant="secondary">완료</MyButton>
          <MyButton type="button" onClick={()=>{ out(); }} variant="secondary">로그아웃</MyButton>
        </div>
      </SignupForm>
    </>
  );
};

export default EmailVerifiedPage;