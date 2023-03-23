const repeatWidth=(character, count)=> character.repeat(count);
console.log(repeatWidth('*',5))

const repeatWidth2=(character)=>(count)=> character.repeat(count);
console.log(repeatWidth2('*')(3))

//repeatStar는 함수입니다. 왜냐하면 repearWidth2가 커링 함수이기 때문에.
const repeatStar=repeatWidth2('*')//두번째파라미터가 없다. 아직 함수이다. 결과값이 없다.
console.log(repeatStar(3))//두번째 파라미터를 넣어줬다.