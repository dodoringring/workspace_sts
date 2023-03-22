export const validateDname=(e)=>{//유효성 검사는 프론트의 몫이다. 정규식으로 유효성 검사로 걸러준다.
  const name=e.target.value;//input onChange
  const han=/^[가-힣]+$/;
  const eng=/^[a-zA-Z]+$/;
  if(name.length===0){
    return " ";//띄어쓰기 필수
  }else if(han.test(name)||eng.test(name)){
    return "";//띄어쓰기 없음
  }else{
    return "부서명은 영어 또는 한글로만 가능합니다.";
  }
}