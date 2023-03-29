import React from 'react'
import KhSignup from './KhSignup';
// import Signup from './KhSignup';
import Signuptype from './Signuptype';

const SignupPage = ({authLogic}) => {
  //window.location.search쿼리스트링 가져오기
  //http://localhost:3000/auth/signup?type=member
  const type = window.location.search.split('=')[1]
  const type2 = window.location.search.split('&')[0].split('=')[1]
  // console.log(window.location.search.split('&'))//[?type=member]
  // console.log(window.location.search.split('&')[0])//?type=member
  // console.log(window.location.search.split('&')[0].split('='))//[?type, member]
  // console.log(window.location.search.split('&')[0].split('=')[0])//?type
  // console.log(window.location.search.split('&')[0].split('=')[1])//member
  console.log(type);
  console.log(type2);
  const signupage = () => {
    if(type){
      return <KhSignup authLogic={authLogic} />
    } else {
      return <Signuptype/>
    }
  } 

  return (
    signupage()
  );
};

export default SignupPage