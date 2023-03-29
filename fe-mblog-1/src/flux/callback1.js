function first(param) {
  console.log(param); //[Function 이름없션]
  param(); //1급 객체... 함수를 파라미터로 받아서 호출 가능
}

function second() {
  console.log(2);
}

first(second);

//위의 코드를 자유자재로 가지고 놀수 있을 정도가 되어야...

//https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures - 클로저
//순서대로 꼭 처리가 되어야 할 땐
function func1() {
  //outter함수 - 클로저
  let num = 0; //선언된 변수
  return function func2() {
    // return () => { //함수에 이름이 없을 수도 arrow function을 사용할 수도 있음. 자유자재로 가능해야함.
    //반환형이 함수인 경우임
    return num + 1; //요기서 사용가능함
  };
}

//아래처럼 반환을 변수로 받을 수 있는 이유는 함수 ~ 일급객체시민이라서
let account = func1(); //account함수가 생성된 후에도 상위 함수인 func1의 변수 num애 접근 가능함
console.log(account()); //왜 0이 찍힐까? 어떻게 하면 1이 나올 수 있을까? 전위/후위 연산자
//위에서 ()가 없으면 [Function]
console.log(account);

//이렇게하면 안됨?? 결과는 똑같잖아~!
function one() {
  console.log(1);
}
function two() {
  console.log(2);
}
one();
two();
