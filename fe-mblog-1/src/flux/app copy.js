//상태는 createStore()안에 있다.
const createStore=()=>{ //배치 위치는 index.js배치-store생성
 let state;//상태를 담아두는 저장소 상태=데이터
 //함수를 담아두는 배열 선언
 let handlers=[] 

 //상태를 바꾸는 일을 send함수가 한다.-useSelector훅을 통해서
 const send=(action)=>{
  //새로운 객체가 만들어진다. 똑같은 state인데 대입연산자로 치환됐다. 새로운 state이다.
  /*Map m= new HahMap()
  m=new HashMap()*/
  console.log("send호출");
  state=worker(state, action)
  //나에게 구독 신청한 사람들에게 알려줌
  handlers.forEach(handler=>handler())//()붙어있다=>함수호출

 }

 const subscribe=((handler)=>{//여기서 핸들러 배열에 담아줌. 핸들러가 콜백함수 useDispatch훅
  handlers.push(handler);//push함수-Array내장함수 배열에 넣을때
 })

 const getState=()=>{
  return state
 }
 //함수안에서 함수를 리턴하도록 처리를 해야 바깥쪽에서 해당 함수를 요청 할 수 있다.
  return{
    /*state/* 이렇게 직접 주지 않는다. */
    send,//함수-객체 파라미터로 들어온 상태를 받아서 가공해서 새로운 객체로 내보냄
    getState,/*함수-상태정보를 담은  state를 반환해줌 어떻게 알고 얘를 호출하지...? 알아서 제공해줘야... */
    subscribe
  }
}//end of Store
//Store
//상태를 담을 변수를 선언
//콜백함수를 담믈 배열 선언
//send함수 구현-action이 파라미터로 들어옴
//구독-발행모델(상태변화있으면 알려줘)-subscribe-handler콜백함수-얘를 통해서 처리
//서브스크라이브를 통해서 들어온 콜백함수는 handler배열에 담긴다.
//getState함수를 통해서 state값을 반환 받을수있다.
//return{send,subscribe,getState}

const worker = (state={count:0},action)=>{//state가 undefined되는것을 방지위해 (count)객체선언
  //무엇을 해야하나요? 참조무결성이 깨지는것 방지로 새로운 상태를 반환해라. 예상치못한 side-effect때문에 반드시 새로운 상태를 반환해줘라
  //상태를 바꾸면 createStore안에 state의 참조무결성이 깨짐
  //불변성을 지켜주기위해서 리덕스에서는 상태를 바꾸는 함수는 반드시 새로운 상태를 반환하라
  //새로운 상태=화면에 입력(Action)으로 상태의 객체를 줄테니까 이 객체를 Deep Copy해서 기존의 링크를 끊어라
switch(action.type){
  case "increase" :
  return{...state, count:state.count+1}
  case "decrease" :
  return{...state, count:state.count-1}
  default:
    return {...state}
}
  return {...state, count:state.count+1}//Deep Copy. 새로운 객체. 
}
//자바스크립트에서는 함수도 파라미터 넘길 수 있다.
const store=createStore(worker)//index.js에서 생성해서 props대신 redux를 쓸 것
//subscribe함수 호출시 파라미터로 콜백 한수를 넘김
store.subscribe(function(){
  console.log(store.getState())
})

//action의 내용은 send 에서만듦 {}안에값을 action으로 넘긴다.
//사용자가 버튼을 클릭 했을때 시그널 발생함-type정해서value를 store에 전달한다.
//store가 받아서 전변으로 관리가됨-G컴포넌트에서 즉시 사용 가능하다.
store.send({type : 'increase'})//시그널 주기 - action
store.send({type : 'increase'})//Action을 dispatcher 가 전달한다.
store.send({type : 'decrease'})

/*
Rule
1. UI한테는 직접적인 상태를 주지않는다. 리턴으로 준다.


함수는 객체다.
소문자로 선언하면 함수이고
대문자로 선언하면 화면을 렌더링 하는 컴포넌트-외우세요

코드 전개 시나리오
return에서는 상태 값을 직접 넘겨주지 않는다.
상태는 createStore함수에 있지만
변경하거나 읽거나 하는 코드들은 UI에 Component들이다.
이 컴포넌트들은 createStore의 함수의 바깥쪽에 위치한다.
제공을 한다는것은 createStore가 내용을 알고있다는 전제이다.
이런걸 줄테니까 이런걸 가지고 니가 바꿔....?
구조를 알아야한다.
그 수많은 어플리케이션의 상태구조를 다 알아야한다? 불가능. 개발자가 상태구조를 알고 있을것이다.
상태를 변경하는 로직을 알고있어야 한다.
createStore안에 let store로 선언되어있다.
worker를 createStore에 넘겨줬다?
언제 상태를 어떤 상태를 바꿀것인가?
타이밍에 대한 문제까지 발생하기때문에 함수호출을 잘 해야한다.
변경해줘라는 시그널을 밖에서 준다. 이미지버튼에 a태그에 url넣은것처럼 사용자가 눌렀을때 서버에 요청이 들어간다.(바깥쪽)
개발자들이 어플리케이션을 만들면서 적절한 시기에 시그널 넘겨주는것이 중요하다.
어떤 상태를 바꿔야한다? 함수가 필요하다.

문제제기
컴포넌트(HomePage.jsx, LoginPage.jsx)가 여러개 있는 상황에서 
어떤 컴포넌트의 데이터가 변경 되었는지 어떻게 알고서 getState함수를 호출 할까요?
구독발행모델-Pub and Subscibe
어떤 함수를 줄테니(구독할테니) 데이터가 변경되면 그 함수를 호출해줄래?
그때 그 함수를 호출해줘
이벤트 처리를 해줘
*/