import * as ActionType from './action-type.js'
//store에서 관리해야하는 상태값의 종류가 점점 늘어나겠지 - 객체리터럴-열거형연산자-n개-초기화
const initializeState={count:0}
//모듈화를 하는 중이니 앞에 export를 붙여주기. reducer는 원래 worker였다.
export const reducer = (state = initializeState, action) => {
  switch (action.type) {
    case ActionType.INCRAESE:
      return { ...state, count: state.count + 2 };//이렇게 하면 새로운 객체가 만들어짐
    case ActionType.DECRAESE:
      return { ...state, count: state.count - 1 };
    case ActionType.RESET:
      return { ...state, count :0};
    default:
      return { ...state };
  }
};