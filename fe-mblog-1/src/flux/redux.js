export const actionCreator=(type)=>(payload)=>({//쿼리함수
  type,
  payload,
});

export const createStore = (reducer) => {
  let state;
  let handlers = [];
  const dispatch = (action) => {
    console.log("send호출");
    state = reducer(state, action);
    handlers.forEach((handler) => handler());
  };
  const subscribe = (handler) => {
    handlers.push(handler);
  };
  const getState = () => {
    return state;
  };
  return {
    dispatch,
    getState,
    subscribe,
  };
};