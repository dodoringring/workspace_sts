import { actionCreator } from "./redux.js";
import { DECRAESE, INCRAESE, RESET } from "./action-type.js";
//store.dispatch(increase());-dispath는 action을 store에 전달하는 허브이다.
//store에 있는 상태값을 꺼내는것이 getState-useSelector
export const increase=()=>actionCreator(INCRAESE)
export const decrease=()=>actionCreator(DECRAESE)
export const reset=()=>actionCreator(RESET)