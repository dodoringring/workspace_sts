import * as ActionType from "./action-type.js"; // 별칭을 ActionType로 붙여서 받음
import { initializeState } from "./state.js";
//store에서 관리해야하는 상태값의 종류가 점점 늘어나겠지 - 객체 리터럴 - 열거형 연산자 - n개 - 초기화
//상태를 관리하는 변수 선언

// let state로 처리했었던 -> 객체 리터럴 //안에 다른 변수도 들어갈 수 있음.
//상태를 변형하는 것 - 리듀서
//첫번째 파라미터 상태값
//두번째 파라미터 액션 - dispatch store에 전달
//action에 담긴 정보를 dispatch가 store에 전달하기 - flux architecture
//One way방식 - 한 방향으로만 흐름
//action - dispatch-store-view

//action-type.js에 별도 정의함
//모듈화를 하는 중이니 앞에 export를 붙여주기
export const reducer = (state = initializeState, action) => {
  switch (action.type) {
    case ActionType.INCREASE:
      return { ...state, count: state.count + 2 };
    case ActionType.DECREASE:
      return { ...state, count: state.count - 1 };
    case ActionType.RESET:
      return { ...state, count: 0 };
    case ActionType.SET_MSG:
      //깊은 복사에서 두번째 인자가 payload에 해당됨
      return { ...state, status: action.bool, msg: action.msg };
    case ActionType.SET_FALSE:
      return { ...state, status: action.bool, msg: action.msg };
    default:
      return { ...state };
  }
};
