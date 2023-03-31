import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToastMsg } from "../../redux/toastStatus/action";
import { sendResetpwEmail } from "../../service/authLogic";
import { memberListDB } from "../../service/dbLogic";
import { LoginForm, MyH1, MyInput, MyLabel, SubmitButton } from "../styles/FormStyle";

const ResetPwdPage = ({authLogic}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.userAuth);
  const[submitBtn, setSubmitBtn] = useState({
    disabled: true,
    bgColor: 'rgb(175, 210, 244)',
    hover: false
  });

  const toggleHover = () => {
    if(submitBtn.hover){
      setSubmitBtn({...submitBtn, hover: false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({...submitBtn, hover: true, bgColor: 'rgb(72, 145, 218)'});
    }
  }

  const [memInfo, setMemInfo] = useState({
    name: "",
    hp: "",
    email: ""
  });

  useEffect(()=> {
    if(memInfo.email&&memInfo.hp&&memInfo.name){ 
      setSubmitBtn({disabled:false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({disabled:true, bgColor: 'rgb(175, 210, 244)'});
    }
  },[memInfo]);


  const changeMemInfo = (e) => {
    const id = e.currentTarget.id;
    const value = e.target.value;
    setMemInfo({...memInfo, [id]: value});
  }

  const send = async () => {
    console.log('비번찾기메일전');
    const member = {
      mem_name : memInfo.name,
      mem_tel : memInfo.hp,
      mem_email : memInfo.email,
      type : 'overlap',
    }
    console.log(member);
    const res = await memberListDB(member);
    console.log(res.data);
    const temp = JSON.stringify(res.data)
    const jsonDoc = JSON.parse(temp)
    console.log(jsonDoc[0]);
    //if(res.data!==1) return dispatch(setToastMsg("일치하는 아이디가 없습니다."));
    if(!jsonDoc[0]) return console.log("일치하는 아이디가 없습니다.");
    else console.log('일치하는 아이디가 있습니다.');
    try {
      const msg = await sendResetpwEmail(authLogic.auth, memInfo.email);
      console.log(msg);
      dispatch(setToastMsg(msg));
      navigate('/login');
    } catch (error) {
      dispatch(setToastMsg(error+": 메일전송 오류입니다."));
    }

  }



  return (
    <LoginForm>
      <MyH1>비밀번호 변경</MyH1>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',Content: 'center', marginTop: '20px', width:"100%"}}>
        <MyLabel> 이름 
          <MyInput type="text" id="name" placeholder="이름을 입력해주세요." 
          onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <MyLabel> 전화번호
          <MyInput type="number" id="hp" placeholder="전화번호를 입력해주세요." 
          onChange={(e)=>{changeMemInfo(e);}} />
        </MyLabel>
        <MyLabel> 이메일
          <MyInput type="email" id="email" placeholder="이메일를 입력해주세요." 
          onChange={(e)=>{changeMemInfo(e);}}/>
        </MyLabel>
        <SubmitButton type="button"  disabled={submitBtn.disabled} style={{backgroundColor:submitBtn.bgColor }}
          onClick={()=>{send()}} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            메일 전송
        </SubmitButton>
      </div>
    </LoginForm>
  );
};

export default ResetPwdPage;