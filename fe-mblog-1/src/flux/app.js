import { decrease, increase } from "./actions.js"
import {reducer} from "./reducer.js";//worker함수 
import { createStore } from "./redux.js"
//사용 - 호출-store생성하기 - index.js-리액트-왜? index.js인가? 
//모든 전역 state를 넣어서 관리하고 싶기 때문이다.=>initailizeState이다. payload=수화물-여러개를 보낼 수 있다.
//3씩 증가해줘 감소시켜줘 이런 정보를 담는것이 payload이다. 증가를 원해? 감소를 원해? 초기화해줄까? =>action-type
//문제제기-app.js하나에 모두 있을때는 파라미터에 reducer(구 worker) 파라미터로 넘겨야함
//실제 화면에서 써야하는것 = app.js에 있는 코드가 React 컴포넌트에 써야하는 코드임
const store=createStore(reducer)//index.js에서 생성해서 props대신 redux를 쓸 것
//subscribe함수 호출시 파라미터로 콜백 함수를 넘김
store.subscribe(function(){//구독 발행 모델
  console.log(store.getState())//변경된 상태값 찍기-리액트 컴포넌츠가 마운트 될때 찍기
  //getstate가 리액트에서 useSelector(state=>state.userAuth). 상태값을 store에서 읽어들일때 사용함
})
//해당하는 화면에 들어간다.
store.dispatch(increase())//시그널 주기 - action-리액트에서는 const dispatch = useDispatch()이다.->dispatch(type. payload) state한테 action을 전달.
store.dispatch(increase())//시그널 주기 - action
store.dispatch(decrease())//시그널 주기 - action