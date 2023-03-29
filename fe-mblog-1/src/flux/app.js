/*
첫째로 문제제기,,, 개발자들이 단점을 제시함 -> 프로젝트의 업무적인 뎁스가 깊어지고 양이 늘어날수록 모델-뷰 계층이 복잡하게 엮이면서 유지보수가 힘들어짐.
복잡도가 올라가는 코드는 좋지 않다. 양이 늘어나는 건 괜찮지만 복잡도가 높아지는 건 경계 대상!
복잡도가 늘어나는 걸 눌러주기 위해 새로운 방식이 필요함 -> One-Way binding -> 해결책 ~ 데이터가 한 방향으로 흐르고 
*/

//Flus Architecture - One Way binding

//콜백함수
//document.querySelector("#root").addEventListener('click', function(){})
//함수 선언 - 일급객체시민 - 함수를 파라미터로 넘김, 리턴으로 넘김, 할당가능
//함수는 어디든 갈 수 있는 권리가 있다.
const createStore = () => {
  console.log(worker);
  //외부함수에서 선언한 변수를 내부 함수에서 사용 가능
  let state = 0; //state.js - 상태 관리가 필요한 변수 꾸러미(묶음)
  //구독 신청한 이벤트들의 꾸러미 담기
  let handlers = [];
  const subscribe = (handler) => {
    //자바스크립트 문법 코드 분석 가치
    handlers.push(handler); //파라미터로 넘어온 콜백함수를 핸들러스 배열에 담아주기
  };
  //외부에서 구독신청을 한 회원들에게 알림처리 - 구독발행모델 패턴 적용한다
  //위에서 선언된 상태 정보를 담은 변수를 새로운 상태정보로 치환 - 기존 참조를 끊는다 - 그게 안전하다
  const send = (action) => {
    //worker함수의 파라미터로 state를 두는 건 기존에 상태정보에 추가된 상태정보다 변경 사항을 담기 위함
    //13번라인에서 선언된 변수에 새로운 상태정보가 추가된 상태정보를 갖는 주소번지 치환
    state = worker(state, action);
    handlers.forEach((handler) => handler());
  };
  //내부함수 - 클로저 검색
  //https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures
  const getState = () => {
    // 실제로 react-redux에서 제공함 - 모방하기
    return state; //네가 관리하는 상태값 모두를 말함. ~ 모두를 돌려줘 - {} 객체리터럴
  };
  //구독 발행 모델

  //리턴타입에 함수이름을 반환하는 건 외부에서 호출하기 위해서임 - API
  return {
    //객체 리터럴을 사용하면 여러개의 함수를 외부에서 사용가능함
    getState,
    send, //()붙이면 망하는거
    subscribe,
  };
};
//고차함수?
//일급객체?

//undefined 떨어지는 게 싫으면 state에 값을 부여하자
const worker = (state = { count: 0 }, action) => {
  //state가 undefined가 되면 안되니까 객체리터럴로 대입해줌
  //do Something...
  //그런데 여기서 상태를 바꾸면 createStore에 있는 state의 참조무결성이 깨짐
  //redux에서는 반드시 이 worker 즉 상태를 바꾸는 함수는 새로운 상태를 반환해라 라는 규칙을 만듦  //그게 깊은 복사
  //새로운 상태를 반환하라는 건 기존에 참조를 끊어라라는 의미임
  //기존의 참조를 끊어야 예상하지 못한 side effect를 원천적으로 차단할 수 있기 때문임
  //↓이렇게 쓰는 사람들은 순수함수에 대해서 모르는 사람...
  //return state;
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };
    case "decrease":
      return { ...state, count: state.count - 1 };
    default:
      return { ...state };
  }
  //return { ...state, count: state.count + 1 }; //이렇게 써야 원본이 지켜짐. 새로운 객체가 만들어짐. - 깊은 복사
};

//스토어 함수 호출하기
//const store = legacy_createStore(reducer) //reducer.js
//상태는 createStore함수 안에 있다 - 6번라인에
//누가 이 상태를 변경하고 읽어가나요? UI의 component
//worker함수의 switch문에서 타입에 따라서 상태를 변경하거나 읽어낸다
//변경되고 읽어낸 정보는 return으로 처리했다
//store를 모아서 상태의 묶음을 넘겨줄거야 ~ 액션에 따라서 다르게 처리해야하니까..
const store = createStore(worker);
store.subscribe(() => {
  //subscribe 안에 들어가는 게 핸들러 함수...
  console.log(store.getState());
});
//아래와 같이 store에 내부함수를 외부에서 호출하려면 return에 반드시 등록할 것
//action의 내용을 만드는 역할은 send를 하는 쪽에서 만들어줌
store.send({ type: "increase" });
//아래 코드로는 새로운 상태값을 확인 불가함
//console.log(store.state);
//console.log(store.getState()); //호출하면 그 상태가 worker를 경유 - 경유했으니 객체리터럴을 가지고 있음.
// store.send();
//console.log(store.getState());

/*
  UI한테는 직접적인 상태를 주지 않을 거야
  그래서 여기서 return하는 것에는 state를 주지 않겠다 - 리덕스 컨벤션
  state를 그냥 주는 것은 자바스크립트 컨셉

  문제제기
  느닷없이/맥락없이 1을 증가하는 컨셉
*/
