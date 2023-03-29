//파라미터가 두개로 나눠져있음. 커링함수 컨셉
//첫번째는 액션의 타입, 두번째는 전달해야하는 값
export const actionCreator = (type) => (payload) => ({
  type,
  payload,
});

export const createStore = (reducer) => {
  //배치 위치는 index.js 배치 - store생성
  let state; //상태를 담아두는 저장소
  let handlers = [];
  const dispatch = (action) => {
    console.log("send호출");
    state = reducer(state, action);
    handlers.forEach((handler) => handler()); //전달받은 함수를 호출해줘
  };

  const subscribe = (handler) => {
    //useDispatch 훅
    handlers.push(handler);
  };

  const getState = () => {
    return state;
  };

  return {
    dispatch, //함수==객체 파라미터로 들어온 상태를 받아서 가공해서 새로운 객체로 내보냄
    getState, //함수 - 상태정보를 담은 state반환해줌
    subscribe,
  };
}; //end of store
