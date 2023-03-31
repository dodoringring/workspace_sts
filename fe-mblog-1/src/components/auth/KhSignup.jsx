/* global daum */
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { memberInsertDB, memberListDB } from '../../service/dbLogic';
import { linkEmail, onAuthChange, signupEmail } from '../../service/authLogic';
import { checkPassword, validateBirthdate, validateEmail, validateHp, validateName, validateNickname, validatePassword } from '../../service/validateLogic';
import { SignupForm, MyH1, MyInput, MyLabel,  MyLabelAb, SubmitButton, MyButton, PwEye, WarningButton} from '../styles/FormStyle';

const KhSignup = ({authLogic}) => {
  const auth = authLogic.getUserAuth();
  const userAuth = useSelector(state => state.userAuth);
  //window.location.search는 ?뒤의 쿼리스트링을 가져옴
  //
  //http://localhost:3000/login/signup?type=member
  const type = window.location.search.split('&')[0].split('=')[1];//member담김
  //console.log(window.location.search.split('&'));//['?type=member']
  //console.log(window.location.search.split('&')[0]);//?type=member
  //console.log(window.location.search.split('&')[0].split('='));//['?type', 'member']
  //console.log(window.location.search.split('&')[0].split('=')[0]);//?type
  //console.log(window.location.search.split('&')[0].split('=')[1]);//member
  //console.log(type);
  const [reSignCheck, setReSignCheck] = useState(false);
  const navigate = useNavigate();

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


  const[post, setPost] = useState({
    zipcode: "",
    addr: "",
    addrDetail: ""
  })

  const [memInfo, setMemInfo] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    birthday: "",
    hp: "",
    nickname: "",
    gender: "없음"
  });

  const [comment, setComment] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    birthday: "",
    hp: "",
    nickname: ""
  });

  const [star,setStar] = useState({
    email: "*",
    password: "*",
    password2: "*",
    name: "*",
    hp: "*",
    nickname: "*",
    birthday: "*"
  })


  const [passwordType, setPasswordType] = useState([
    {
      type:'password',
      visible:false
    },
    {
      type:'password',
      visible:false
    }
  ]);


  const [googleEmail, setGoogleEmail] = useState('');


  useEffect(()=> {
    let check = true;
    Object.keys(star).forEach((key)=>{
      if(star[key]==='*') check = false;
    })
    if(check){ 
      setSubmitBtn({disabled:false, bgColor: 'rgb(105, 175, 245)'});
    } else {
      setSubmitBtn({disabled:true, bgColor: 'rgb(175, 210, 244)'});
    }
  },[star]);

  useEffect(()=> {
    const onAuth = async() => {
      const user = await onAuthChange(userAuth.auth) ;
      if(user){
        setGoogleEmail(user.email);
        setStar({
          email: "",
          password: "*",
          password2: "*",
          name: "*",
          hp: "*",
          nickname: "*",
          birthday: "*"
        });
        setMemInfo({
          email: user.email,
          password: "",
          password2: "",
          name: "",
          hp: "",
          nickname: "",
          birthday: "",
          gender:"없음"
        });
      }
    };
    onAuth();
  },[setGoogleEmail,setStar,setMemInfo, userAuth.auth]);


  const passwordView = (e) => {
    const id = e.currentTarget.id;
    if(id==="password") {
      if(!passwordType[0].visible) {
        setPasswordType([{type: 'text', visible: true},passwordType[1]]);
      } else {
        setPasswordType([{type: 'password', visible: false},passwordType[1]]);
      }
    } else if(id==="password2") {
      if(!passwordType[1].visible) {
        setPasswordType([passwordType[0],{type: 'text', visible: true}]);
      } else {
        setPasswordType([passwordType[0],{type: 'password', visible: false}]);
      }
    }
  }

  const changeMemInfo = (e) => {
    console.log('changeMemInfo');
    const id = e.currentTarget.id;
    console.log(id);
    const value = e.target.value;
    console.log(value);
    setMemInfo({...memInfo, [id]: value});
  }
  //닉네임 중복확인 
  const overlap = async(key) => {
    console.log('닉네임 중복확인' + key);
    let params;
    if(key === 'email') {
      params = { MEM_EMAIL: memInfo[key], type:'overlap' }
    } else {
      params = { MEM_NICKNAME: memInfo[key], type:'overlap' }
    }
    console.log(params);
    let response = {data: 0}
    response = await memberListDB(params);//get방식 처리 -> params
    console.log(response.data);//한번 감싸서 넘어오기때문에 data를 붙여서 확인하기
    //Array(1)
    //0. {MEM_UID:'yoribogo', MEM_NAME:'요리보고'}
    const data = JSON.stringify(response.data)
    const jsonDoc = JSON.parse(data)
    if(jsonDoc){
      console.log(jsonDoc[0].MEM_NAME)
    } else {
      console.log("입력한 닉네임은 사용가능합니다.")
    }
    //닉네임이 존재할 때
    if(response.data){

    }
    //닉네임이 없을 때
    else {

    }
  } 

  const validate = (key, e) => {
    let result;
    if(key==='email'){
      result = validateEmail(e); 
    } else if(key==='nickname'){
      result = validateNickname(e); 
    } else if(key==='password'){
      result = validatePassword(e); 
    } else if(key==='password2'){
      result = checkPassword(memInfo.password, e); 
    } else if(key==='name'){
      result = validateName(e); 
    } else if(key==='hp'){
      result = validateHp(e); 
    } else if(key==='birthday'){
      result = validateBirthdate(e); 
    } 
    setComment({...comment, [key]: result}); 
    if(result){
      if(result===' '){
        setStar({...star, [key]:""});
      } else {
        setStar({...star, [key]:"*"});
      }
    }else {
      setStar({...star, [key]:""});
    }
  }
  //다음 우편번호 검색기 구현
  const openZipcode = () => {
    new daum.Postcode({
      oncomplete: function(data) {
        let addr = ''; 
        if (data.userSelectedType === 'R') { 
          addr = data.roadAddress;//도로명
        } else { 
          addr = data.jibunAddress;//지번
        }
        console.log(data);
        console.log(addr);
        console.log(post.postNum);
        setPost({...post, zipcode:data.zonecode, addr:addr}) ;
        document.getElementById("zipcode").value = data.zonecode;
        document.getElementById("addr").value = addr;
        document.getElementById("addrDetail").focus();
      }
    }).open();
  }
  //회원정보 수정하기 구현 예정
  const signUpdate = () => {

  }

  //회원 가입 구현
  const signup = async() => {
    console.log('회원가입 구현');
    try {
      let uid;
      console.log(googleEmail);
      if(googleEmail){
        console.log(auth); 
        console.log(memInfo); 
        uid = await linkEmail(auth, memInfo);
        console.log(uid);
      } else {
        uid = await signupEmail(auth, memInfo);
      }
      console.log(uid);
      //const pwd = pwdEncrypt(memInfo.password);
      const b = memInfo.birthday;
      let birthday = ""; 
      if(b!==""){
        birthday = b.slice(0,4) + '-' + b.slice(4, 6) + '-' + b.slice(6,8);
      }
      console.log('입력받은 생일정보 '+birthday);
      const datas = {
        mem_uid: uid,
        mem_name: memInfo.name,
        mem_pw: memInfo.password,
        mem_email: memInfo.email,
        mem_birthday: birthday,
        mem_tel: memInfo.hp,
        mem_nickname: memInfo.nickname,
        mem_zipcode: post.zipcode,
        mem_addr: post.addr,
        mem_addr_dtl: post.addrDetail,
        mem_status: 0,
        mem_auth: (type==='member'?'member':'teacher'),
        mem_gender: memInfo.gender
      }
      console.log(datas)
      const response = await memberInsertDB(datas);
      console.log(response);
      if(response.data!==1) {
      return "DB 오류: 관리자에게 연락바랍니다.";
    }
      sessionStorage.clear();
      navigate('/');
      return "회원가입되었습니다. 감사합니다.";
      
    } catch (error) {
      console.log(error+" 오류: 관리자에게 연락바랍니다.");
    }
  }//end of 회원가입 구현
  
  const checkboxLable = ['없음','남자','여자']

  const Checkbox = checkboxLable.map((item, index) => (
    <Form.Check inline label={item} value={item} name="group1" type='radio' checked={memInfo.gender===item?true:false} readOnly
    id={`inline-radio-${item}`} key={index} onClick={(e)=> {setMemInfo({...memInfo, gender: e.target.value})}}/>
  ))
  
  const handleSignup = (event) => {
    console.log('가입하기 또는 수정하기 버튼클릭 이벤트');
    signup()    
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', width:"100%"}}>
        <SignupForm  suggested={false}>
          <MyH1>{'회원가입'}</MyH1>
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={{padding: '30px 30px 0px 30px'}}>
              { googleEmail
                ?
                <>
                  <MyLabel> 이메일 
                    <MyInput type="email" id="email" defaultValue={googleEmail} disabled={true} />
                  </MyLabel>
                </>
                :
                <div style={{display: 'flex' , flexWrap: 'wrap'}}>
                  <MyLabel> 이메일 <span style={{color:"red"}}>{star.email}</span>
                    <MyInput type="email" id="email" placeholder="이메일를 입력해주세요." 
                    onChange={(e)=>{changeMemInfo(e); validate('email', e);}}/>
                    <MyLabelAb>{comment.email}</MyLabelAb>
                  </MyLabel>
                  <MyButton type="button" onClick={()=>{overlap('email');}}>중복확인</MyButton>
                </div>
              }
              <div style={{display: 'flex'}}>
                <MyLabel> 닉네임 <span style={{color:"red"}}>{star.nickname}</span>
                  <MyInput type="text" id="nickname" defaultValue={memInfo.nickname} placeholder="닉네임을 입력해주세요." 
                  onChange={(e)=>{changeMemInfo(e); validate('nickname', e);}}/>
                  <MyLabelAb>{comment.nickname}</MyLabelAb>
                </MyLabel>
                <MyButton type="button" onClick={()=>{overlap('nickname')}}>중복확인</MyButton>
              </div>
              <MyLabel> 비밀번호 <span style={{color:"red"}}>{star.password}</span>
                <MyInput type={passwordType[0].type} id="password" autoComplete="off" placeholder="비밀번호를 입력해주세요." 
                onKeyUp={(e)=>{setComment({...comment, password2: checkPassword(e.target.value,memInfo.password2)});}} 
                onChange={(e)=>{changeMemInfo(e);  validate('password', e);}}/>
                <div id="password" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[0].visible?"gray":"lightgray"}`}}>
                  <PwEye className="fa fa-eye fa-lg"></PwEye>
                </div>
                <MyLabelAb>{comment.password}</MyLabelAb>
              </MyLabel>
              <MyLabel> 비밀번호 확인 <span style={{color:"red"}}>{star.password2}</span>
                <MyInput type={passwordType[1].type} id="password2"  autoComplete="off" placeholder="비밀번호를 한번 더 입력해주세요."
                onChange={(e)=>{changeMemInfo(e); validate('password2', e.target.value)}}/>
                <div id="password2" onClick={(e)=> {passwordView(e)}} style={{color: `${passwordType[1].visible?"gray":"lightgray"}`}}>
                  <PwEye className="fa fa-eye fa-lg"></PwEye>
                </div>
                <MyLabelAb>{comment.password2}</MyLabelAb>
              </MyLabel>         
            </div>

            <div style={{padding: '30px 30px 0px 30px'}}>
              <MyLabel> 이름 <span style={{color:"red"}}>{star.name}</span>
                <MyInput type="text" id="name" defaultValue={memInfo.name} placeholder="이름을 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e); validate('name', e);}}/>
                <MyLabelAb>{comment.name}</MyLabelAb>
              </MyLabel>
              <MyLabel> 전화번호 <span style={{color:"red"}}>{star.hp}</span>
                <MyInput type="text" id="hp" defaultValue={memInfo.hp} placeholder="전화번호를 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e); validate('hp', e);}} />
                <MyLabelAb>{comment.hp}</MyLabelAb>
              </MyLabel>

              <MyLabel> 생년월일 <span style={{color:"red"}}>{star.birthday}</span>
                <MyInput type="text" id="birthday" defaultValue={memInfo.birthday} placeholder="생년월일을 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e); validate('birthday', e);}}/>
                <MyLabelAb>{comment.birthday}</MyLabelAb>
              </MyLabel>

              <MyLabel> 우편번호
                <MyInput type="text" id="zipcode" defaultValue={memInfo.zipcode} placeholder="우편번호를 입력해주세요." 
                onChange={(e)=>{changeMemInfo(e);}} />
                <MyLabelAb>{comment.zipcode}</MyLabelAb>
              </MyLabel>

              <div style={{display: 'flex'}}>
                <MyLabel> 주소
                  <MyInput type="text" id="addr" defaultValue={post.addr} readOnly placeholder="주소검색을 해주세요."/>
                </MyLabel>
                <MyButton type="button" onClick={()=>{openZipcode()}}>주소검색</MyButton>
              </div>
              <MyLabel> 상세주소
                <MyInput type="text" id="addrDetail" defaultValue={post.addrDetail} readOnly={post.addr?false:true}
                onChange={(e)=>{setPost({...post, addrDetail : e.target.value})}}/>
              </MyLabel>
            </div>
          </div>
          <MyLabel style={{margin:0}}> 성별
            <div style={{marginTop:10}} key={`inline-radio`} className="mb-3">
              {Checkbox}
            </div>
          </MyLabel>
            <SubmitButton type="button" style={{backgroundColor:submitBtn.bgColor }}
            onClick={handleSignup} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
              {'가입하기'}
            </SubmitButton>
        </SignupForm>
      </div>
    </div>
  );
};

export default KhSignup;