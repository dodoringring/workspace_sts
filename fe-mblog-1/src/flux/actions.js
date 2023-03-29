import { DECREASE, INCREASE, RESET } from "./action-type.js";
import { actionCreator } from "./redux.js";
//반복되는 코드를 줄이기 위해 increase를 함수로 뺌
//store.dispatch(increase()); - dispatch는 action을 store에 전달하는 허브 역할
//store에 들어있는 상태값을 꺼내는 것이 => 우리가 만든 getState - 리액트의 useSelector
export const increase = actionCreator(INCREASE);
export const decrease = actionCreator(DECREASE);
export const reset = actionCreator(RESET);
