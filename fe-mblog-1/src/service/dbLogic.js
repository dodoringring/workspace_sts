import axios from "axios";

export const qnaListDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(board)
      //axios-비동기 요청 처리 ajax-fetch(브라우저)-axios(NodeJS-오라클 서버 연동 가능해짐)
      const response = axios({//3000번 서버에서 8000번 서버로 요청을 함 - 네트워크(다른서버-CORS이슈)
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "reple/qnaList",
        params: board, // 쿼리스트링은 header에 담김 - get방식 params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const qnaInsertDB = (board) => {
  console.log(board)//fileNames가 있어야 한다. 배열. =['man1.png','man2.png','man3.png']
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "reple/qnaInsert",
        data: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const qnaUpdateDB = (board) => {
  //대소문자 구분 어떨게 할것인가?
  //리턴값은 대문자로
  //아니면 둘다 대문자로 할까? 안됨... 마이바티스가 자동으로 바꿔준다?
  console.log(board)//사용자가 입력한 값 확인하기
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "reple/qnaUpdate",
        data: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const qnaDeleteDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(board)
      //axios-비동기 요청 처리 ajax-fetch(브라우저)-axios(NodeJS-오라클 서버 연동 가능해짐)
      const response = axios({//3000번 서버에서 8000번 서버로 요청을 함 - 네트워크(다른서버-CORS이슈)
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "reple/qnaDelete",
        params: board, // 쿼리스트링은 header에 담김 - get방식 params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadImageDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "reple/imageUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const boardInsertDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "reple/boardInsert",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberListDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/memberList",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberInsertDB = (member) => {
  return new Promise((resolve, reject) => {
    console.log(member)
    try {
      const response = axios({
        method: "post", // @RequestBody
        url: process.env.REACT_APP_SPRING_IP + "member/memberInsert",
        data: member, // post방식 data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberUpdateDB = (member) => {
  return new Promise((resolve, reject) => {
    console.log(member)
    try {
      const response = axios({
        method: "post", // @RequestBody
        url: process.env.REACT_APP_SPRING_IP + "member/memberUpdate",
        data: member, // post방식 data
      });
      resolve(response); // 요청 처리 성공했을 때
    } catch (error) {
      reject(error); // 요청 처리 실패했을 때
    }
  });
};

export const memberDeleteDB = (member) => {
  return new Promise((resolve, reject) => {
    console.log(member)
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/memberDelete",
        params: member,
      });
      resolve(response); // 요청 처리 성공했을 때
    } catch (error) {
      reject(error); // 요청 처리 실패했을 때
    }
  });
};

export const deptInsertDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", // @RequestBody
        url: process.env.REACT_APP_SPRING_IP + "dept/deptInsert",
        data: dept, // post방식 data
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const deptUpdateDB = (dept) => {
  return new Promise((resolve, reject) => {
    console.log(dept)
    try {
      const response = axios({
        method: "post", // @RequestBody
        url: process.env.REACT_APP_SPRING_IP + "dept/deptUpdate",
        data: dept, // post방식 data
      });
      resolve(response); // 요청 처리 성공했을 때
    } catch (error) {
      reject(error); // 요청 처리 실패했을 때
    }
  });
};

export const deptDeleteDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "dept/deptDelete",
        params: dept,
      });
      resolve(response); // 요청 처리 성공했을 때
    } catch (error) {
      reject(error); // 요청 처리 실패했을 때
    }
  });
};

export const deptListDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "dept/deptList",
        params: dept, // 쿼리스트링은 header에 담김 - get방식 params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};