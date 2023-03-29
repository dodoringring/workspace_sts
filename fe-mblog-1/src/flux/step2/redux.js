//파라미터가 두개로 나눠져있음. 커링함수 컨셉
//첫번째는 액션의 타입, 두번째는 전달해야하는 값
//type을 정의하는 규칙 - 커링함수
//매개변수 분할 처리
//첫번째 파라미터 타입, 두번째 파라미터 data 받아오는 인자
//payload - 수하물
//개발자가 정의한 data나 에러처리에 필요한 메시지값
//요청에 대한 응답 메시지로 사용이 가능함 - Toast
//실제 서비스에서는 필요없음 - react-redux
//순서대로 처리할 필요가 있음 - 커링함수 패턴 적용함
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
