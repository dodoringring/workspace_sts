import axios from "axios";

export const memberListDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.React_APP_SPRING_IP+ "member/memberList",
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
      const response = axios({ //안의 속성들은 axios가 제공하고있다. 비동기처리. Ajax대신에 씀
        method: "post",//@RequestBody
        url: process.env.React_APP_SPRING_IP+ "member/memberInsert",
        data: member,//post방식으로 전송시 반드시 data속성으로 관리할것
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
        method: "post",//
        url: process.env.React_APP_SPRING_IP+ "member/memberUpdate",
        data: member,//post방식으로 전송시 반드시 data속성으로 관리할것
      });
      resolve(response);//요청처리가 성공했을때
    } catch (error) {
      reject(error);//요청 처리 실패했을때
    }
  });
};

export const memberDeleteDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.React_APP_SPRING_IP+ "member/memberDelete",
        params: member,//쿼리스트링은 헤더에 담김 -get방식
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
        method: "post",
        url: process.env.React_APP_SPRING_IP+ "dept/deptInsert",
        data: dept,//post방식으로 전송시 반드시 data속성으로 관리할것
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
        method: "post",
        url: process.env.React_APP_SPRING_IP+ "dept/deptUpdate",
        data: dept,//post방식으로 전송시 반드시 data속성으로 관리할것
      });
      resolve(response);//요청처리가 성공했을때
    } catch (error) {
      reject(error);//요청 처리 실패했을때
    }
  });
};

export const deptDeleteDB = (dept) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.React_APP_SPRING_IP+ "dept/deptDelete",
        params: dept,//쿼리스트링은 헤더에 담김 -get방식
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
        url: process.env.React_APP_SPRING_IP+ "dept/deptList",
        params: dept,//쿼리스트링은 헤더에 담김 -get방식
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

