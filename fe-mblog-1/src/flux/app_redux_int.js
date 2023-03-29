//Flux architecture를 풀어서 보여준 느낌적인 느낌.... ~ index.js에서 store를 생성해서 사용할것이다.

//상태는 createStore() 안에 있다.
//상태를 담을 변수 선언
//콜백 함수를 담을 배열 선언
//send함수 구현 - 파라미터로 action을 받는다.
//구독발행모델 ~ 함수를 줄테니까 바뀌면 함수를 호출해달라 - subscribe(handler-콜백함수) 콜백함수로 받아서 처리해달라
//subscribe를 통해서 들어온 콜백 함수는 handlers배열에 담는다
//getState함수를 통해서 state값을 반환 받음.
//return {send, subscribe, getState} 열거해야하니까 {}로 묶음.
const createStore = () => {
  //배치 위치는 index.js배치 - store 생성
  //데이터... 바뀌면 상태라고 함...
  let state; //상태를 담아두는 저장소 //flux 아키텍쳐 안에 나와있는 예약 키워드
  let handlers = []; //함수를 담아두는 배열 선언
  //상태를 바꾸는 일을 함.  - useSelector 훅
  //상태를 어디서 어떻게 만들어야? ~ 데이터가 언제 바뀌었는지 알고있어야 이런 코드를 쓸 수 있음.
  const send = (action) => {
    console.log("send호출");
    //useState가 언제 바뀌었는지 알고 상태값을 호출을 해줄것인가.

    //새로운 객체가 만들어진다.
    state = worker(state, action); //함수가 넘어와있으니까 그 안에 파라미터로 state가 있으면
    //나에게 구독 신청한 사람들에게 모두 알림
    handlers.forEach((handler) => handler()); //전달받은 함수를 호출해줘 ~ 괄호 있음(함수호출)
  };

  //함수를 관리하기 위해... 파라미터로 함수가 들어온다. 콜백함수
  //useDispatch훅...
  const subscribe = (handler) => {
    handlers.push(handler);
  };

  const getState = () => {
    return state;
  };
  //함수 안에서 함수를 리턴하도록 처리를 해야 바깥쪽에서 해당 함수를 요청할 수 있다.
  return {
    // state, //이런식으로 state를 직접 반환하지는 않겠다. 직접적으로 상태를 주지 않을 거라서
    send, //함수==객체 파라미터로 들어온 상태를 받아서 가공해서 새로운 객체로 내보냄 //밖에서 얘를 호출해야하니까(callback으로) send를 넘겨줌.
    getState, //함수 - 상태정보를 담은 state반환해줌 //어떻게 알고 getState를 호출할 수 있을까? 그 방법을 제공해줘야함.
    subscribe,
  };
};

//react-redux에서는 worker가 dispatcher가 된다.
//reducer, dispatch함수, 일꾼
const worker = (state = { count: 0 }, action) => {
  //state가 undefined되는 것을 방지하기 위해 count(객체)선언
  //worker안에서 무엇을 해야할까 ~ 참조 무결성이 깨지는 것을 방어하기 위해 새로운 상태를 반환하라고 함. 입력으로 상태 객체를 줄테니 그 객체를 복사(deep copy)해서 기존의 참조를 끊어라.
  //왜 끊게 만들까? 예상치못한 사이드이펙트로 인해 버그나 시스템 장애가 발생할 수 있어서. 그걸 방지하기 위해 상태를 바꾸는 함수는 반드시 새로운 상태를 반환해주라는 규칙을 만들었음.
  //상태를 바꾸면 createState안에 state의 참조 무결성이 깨짐.
  //리덕스에서는 상태를 바꾸는 함수는 반드시 새로운 상태를 반환하라. 그래야 참조무결성이 깨지지 않을테니
  //새로운 상태라는 건 화면의 입력(Action)으로 상태의 객체를 줄테니 이 객체를 Deep copy해서 기존의 참조를 끊어라. - 그래야 side effect방지 가능함.
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };
    case "decrease":
      return { ...state, count: state.count - 1 };
    default:
      return { ...state };
  }
  return { ...state, count: state.count + 1 }; // 새로운 객체 ~ Deep Copy - 원본과의 연결고리를 끊어버림. 완전히 새로운 객체를 참조하게되는
};
//자바스크립트에서는 함수도 파라미터로 넘길 수 있다.
const store = createStore(worker); //index.js에서 생성할 것임 - props를 안주고 중앙에서 redux?? //파라미터로 worker라는 함수를 전달해줌.
//subscribe함수 호출시 파라미터로 콜백함수를 넘김
store.subscribe(function () {
  console.log(store.getState());
});

//action의 내용은 send에서 만듦
//사용자가 버튼을 클릭 했을 때 시그널 발생함 - type정해서 value를 store에 전달함
//store가 받아서 전변으로 관리됨 - G컴포넌트에서 즉시 바로 사용가능함 store를 이용하면
store.send({ type: "increase" }); //시그널 주기 - action
store.send({ type: "increase" });
store.send({ type: "decrease" });
/*
  함수는 객체다.
  소문자로 선언하면 함수이고 대문자로 선언하면 화면을 렌더링하는 컴포넌트이다.
  return에서는 상태값을 직접 넘겨주지 않는다. 상태는 createStore함수에 있지만 변경하거나 읽거나 하는 코드들은 UI의 Component들이다.
  이 컴포넌트들은 createStore함수의 바깥쪽에 위치한다. 바깥쪽에서 안의 값을 수정하기 위해서는 어떻게 해야할까? createStore에서 변경할 수 있는 방법을 제공해줘야함.
  이런걸 줄테니까 니가 이렇게 바꿔라 라는 컨셉으로 코드를 전개해야함. 바꾸기 위해서는 내부 상태 구조를 알고 있어야 할텐데 누가 알고있나 그걸 개발하는 개발자가...
  상태를 바꿔야하는 상태가 createStore안의 let state로 선언되어있는데 그걸 바꾸기위해서 worker를 createStore에 넘겨주면?
  언제 어떤 상태를 바꿀 것인가. 타이밍에 대한 문제가 발생. 함수 호출을 잘 해야함. 언제 뭐를 바꾸라는 시그널을 누가 줘야하나? store안에?밖에? 바깥에서. 개발자들이 어플을 만들면서 적절한 타이밍에 그 시그널을 넘겨주는 게 중요함.
  createStore은 그럼 그 안에서 그런 시그널을 받을 수 있는 걸 제공해야함.

  1. UI한테는 직접적인 상태를 주지 않는다.

  문제제기
  컴포넌트(HomePage.jsx, LoginPage.jsx...)가 여러개 있는 상황에서 어떤 컴포넌트가 데이터가 변경되었는지 어떻게 알고서 getState함수를 호출할까?
  구독발행모델 - Pub and Subscribe ~ 구독해두면 변화가 있을 때 연락이 옴??
  구독발행모델: 일종의 패턴.. 내가 어떤 함수를 줄테니 구독할테니 데이터가 변경되면 그 함수를 호출해줘/이벤트 처리를 해줘.
  외부에서 상태가 바뀌었을 때 바뀐 상태정보를 반환받을 수 있음.
  */
