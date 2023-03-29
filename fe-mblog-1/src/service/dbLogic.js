import axios from "axios";

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
    try {
      const response = axios({
        //아래에서 사용하는 속성들은 axios API가 제공함
        //fetch와 공통점 -> 비동기처리
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "member/memberInsert",
        data: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberUpdateDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "member/memberUpdate",
        data: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const memberDeleteDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/memberDelete",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const deptInsertDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "dept/deptInsert",
        // params: dept, //post면 params를 쓰지 않는다고...
        data: dept, //post방식으로 전송시 반드시 data속성으로 파라미터 줄것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const deptUpdateDB = (dept) => {
  return new Promise((resolve, reject) => {
    console.log(dept);
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "dept/deptUpdate",
        // params: dept, //post면 params를 쓰지 않는다고...
        data: dept, //post방식으로 전송시 반드시 data속성으로 파라미터 줄것
      });
      resolve(response); // 요청 처리가 성공했을 때
    } catch (error) {
      reject(error); // 요청 처리가 실패했을 때
    }
  });
};

export const deptDeleteDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get", //axios에서 delete 지원 안된다고 함
        url: process.env.REACT_APP_SPRING_IP + "dept/deptDelete",
        params: dept, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const deptListDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "dept/deptList",
        params: dept, //쿼리스트링은 header에 담김 - get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
