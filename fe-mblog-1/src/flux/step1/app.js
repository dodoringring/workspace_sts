import { decrease, increase } from "./actions.js";
import { reducer } from "./reducer.js"; //코어를 담당하는... worker함수를 -> reducer로 바꿔봄. redux에서 정한 이름.
import { createStore } from "./redux.js";
//사용 - 함수 호출 - store생성하기 - index.js - 리액트에서는 인덱스에서 store를 생성할 것이다~ => 왜 index.js일까용? -> 생성한 store안에 모든 전역 상태값을 가져다 활용하고 싶어~! initializeState입니다... 처음에 type(첫번째 파라미터 action 종류를 구분함.)만 있다가 payload(두번째 파라미터)도 추가함... 수하물 차량 느낌... 사용자가 변화를 주고자하는 상태??
//app.js에 있는 코드가 리액트 컴포넌트에 써야하는 코드임.
//문제제기 - app.js 하나에 모두 있을 때는 파라미터에 reducer(구:worker) 파라미터로 넘겨야 함
const store = createStore(reducer); //index.js에서 생성할 것임 - props대신 중앙에서 즉시 한번에 가져다 사용

//subscribe함수 호출시 파라미터로 콜백함수를 넘김
//구독 발행 모델 - 함수 호출 - 구독을 할테니 상태값이 변경되면 알려줘라. 내가 그 상태값이 필요하니까 ~ 마운트하는데 써야함.
store.subscribe(function () {
  //getState = 리액트에서 useSelector(state => state.userAuth) => 상태값을 store에서 읽어올 때 사용하는 훅
  console.log(store.getState()); //변경된 상태값 찍기 - 리액트 컴포넌트가 마운트될 때 찍기
});

//▽해당하는 화면(컴포넌트에 들어갈 코드들...)
store.dispatch(increase()); //시그널 주기 - action //dispatch -> 리액트 : const dispatch = useDispatch() --> dispatch(type, payload) => 화면에서 사용 => state한테 액션을 전달
store.dispatch(increase());
store.dispatch(decrease());

// redux 구조
// action - dispatch - store - view
//dispatch -> 전달할 때 사용
//subscribe -> 값을 가져올 때 사용
