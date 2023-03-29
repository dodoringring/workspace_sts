let global = -99; //전역변수

function func1() {
  let num = 0; //지역변수
  return num;
}

//관전포인트 - 파라미터로 넘어온 값과 나가는 값이 다르다 - 변했다.
function func2(num) {
  num = num + 1; //지역변수 ~ 불변성 global이 바뀔뿐 num값은 바뀌지 않음.
  return num;
}

//관전포인트 - num의 값이 바뀌지 않는다. - 불변성 - 리액트컨벤션
function func3() {
  let num = 0;
  global = num + 1;
  return global;
}

console.log(func1());
console.log(func2(2));
console.log(global);
console.log(func3());
console.log(global);
