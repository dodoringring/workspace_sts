import axios from "axios";

export const jsonMemberListDB = (member) => {
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