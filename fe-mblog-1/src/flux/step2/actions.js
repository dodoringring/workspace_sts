import {
  DECREASE,
  INCREASE,
  RESET,
  SET_FALSE,
  SET_MSG,
} from "./action-type.js";
import { actionCreator } from "./redux.js";
//반복되는 코드를 줄이기 위해 increase를 함수로 뺌
//store.dispatch(increase()); - dispatch는 action을 store에 전달하는 허브 역할
//store에 들어있는 상태값을 꺼내는 것이 => 우리가 만든 getState - 리액트의 useSelector
export const increase = actionCreator(INCREASE);
export const decrease = actionCreator(DECREASE);
export const reset = actionCreator(RESET);
export const setToastMsg = (msg) => {
  //action creator없이 독립적으로 함수 생성.
  return {
    type: SET_MSG,
    msg: msg,
    bool: true,
  };
};
export const setToastFalse = () => {
  //실제 설계할 때 이런 방법으로 늘려나가면 된다~~
  return {
    type: SET_FALSE,
    msg: "",
    bool: false,
  };
};
