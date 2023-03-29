const repeatWidth = (character, count) => character.repeat(count);
console.log(repeatWidth("*", 5));

const repeatWidth2 = (character) => (count) => character.repeat(count);
console.log(repeatWidth2("*")(3));

//repeatStar는 함수입니다. 왜냐하면 repeatWidth2가 커링함수이기 때문임.
const repeatStar = repeatWidth2("*");
console.log(repeatStar(3));
