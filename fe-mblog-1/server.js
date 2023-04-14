// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require("express");
const path = require("path");
const cors = require("cors");
// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();

app.use(express.json());
// 8000 포트로 서버 오픈
app.use(cors());
app.use(express.static("build"));
//app.use('/favicon.png', express.static(path.join(__dirname + '/build/favicon.png')));
const port = 7000;

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/build", "index.html"));
});

app.listen(port, () => {
  console.log(path.join(__dirname + "/build", "index.html"));
});

// 이제 터미널에 node app.js 를 입력해보자.