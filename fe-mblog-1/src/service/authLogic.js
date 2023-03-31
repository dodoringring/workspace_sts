import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

class AuthLogic {
  constructor() {
    this.auth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
    // this.kakaoProvider = new KakaoAuthProvider();
    // this.githubProvider = new GithubAuthProvider();
  }

  getUserAuth = () => {
    return this.auth; //자바스크립트에서는 변수 선언없이 this.auth해도됨
  };

  getGoogleAuthProvider = () => {
    return this.googleProvider;
  };
}

export default AuthLogic; //외부의 js에서 사용할 때

//사용자가 변경되는지 지속적으로 체크하여 변경될 때마다 호출됨 - 구글 서버에서 제공하는 서비스
//콜백함수
export const onAuthChange = (auth) => {
  return new Promise((resolve) => {
    //비동기 서비스 구현
    // 사용자가 바뀌었을 때 콜백함수를 받아서
    //밖으로 나왔으니까 this를 쓸 수 없음. 그래서 위에서 전역으로 빼둠
    auth.onAuthStateChanged((user) => {
      //사용자 정보가 바뀌게되면 user 파라미터 주입
      resolve(user); //내보내지는 정보 - View계층 -> App.js
    });
  });
};

//로그아웃 버튼 클릭시 호출하기
export const logout = (auth) => {
  //리덕스로 파라미터를 이용할 것이라 auth를 넣어줘야함
  return new Promise((resolve, reject) => {
    auth.signOut().catch((e) => reject(e + "logout error"));
    //우리 회사가 제공하는 서비스를 누리기 위해서는 구글에서 제공하는 기본 정보 외에 추가로 필요한 정보가 있다 - 테이블 설계 - 세션
    //로그인 성공시 세션 스토리지에 담아둔 정보를 모두 지운다
    window.sessionStorage.clear(); //로그인 정보를 세션에 담을 것이기 때문에 로그아웃시 세션 날리기
    //최상위 객체 - window 그러나 여기서는 생략 가능
    //서비스를 더이상 사용하지 않는 경우이므로 돌려줄 값은 없다.
    resolve(); //그래서 파라미터는 비웠다.
  });
};

//이메일과 비번으로 회원가입 신청을 한 경우 로그인 처리하는 함수임
//auth - AuthLogic 클래스 생성자 getAuth() - auth
//두번째와 세번째 - 하나로 묶었다 - email, password
export const loginEmail = (auth, user) => {
  console.log(auth);
  console.log(user.email + ", " + user.password);
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        resolve(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ", " + errorMessage);
        reject(error);
      });
  });
};

//로그인 시도시 구글 인증인지 아니면 깃허브 인증인지 문자열로 넘겨받음
//구글 인증인 경우 - Google
//깃허브 인증인 경우 - Github
export const loginGoogle = (auth, googleProvider) => {
  return new Promise((resolve, reject) => {
    //제공자의 정보이면 팝업을 띄워서 로그인을 진행하도록 유도함.
    signInWithPopup(auth, googleProvider) //팝업 열림
      .then((result) => {
        //콜백이 진행됨
        const user = result.user; //구글에 등록되어있는 profile 정보가 담겨있음
        console.log(user);
        resolve(user); //인증된 사용자 프로필 정보도 화면 쪽으로 내보낸다 Promise가 제공하는 콜백 Promise의 파라미터는 두개 - resolve, reject - 비동기
      })
      .catch((e) => reject(e));
  });
};

export const signupEmail = (auth, user) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        sendEmail(userCredential.user).then(() => {
          resolve(userCredential.user.uid);
        });
      })
      .catch((e) => reject(e));
  });
};
export const linkEmail = (auth, user) => {
  console.log(auth);
  console.log(auth.currentUser);
  console.log(user);
  return new Promise((resolve, reject) => {
    console.log(user.email + "," + user.password);
    const credential = EmailAuthProvider.credential(user.email, user.password);
    console.log(credential);
    console.log(auth.currentUser.uid);
    resolve(auth.currentUser.uid);
    /* 인증정보가 다른 사용자 계정에 이미 연결되어 있다면 아래 코드 에러 발생함
    linkWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        console.log(usercred);
        const user = usercred.user;
        console.log("Account linking success", user.uid);
        resolve(user.uid);
      })
      .catch((e) => reject(e));
    */
  });
};

export const sendEmail = (user) => {
  return new Promise((resolve, reject) => {
    sendEmailVerification(user)
      .then(() => {
        resolve("해당 이메일에서 인증메세지를 확인 후 다시 로그인 해주세요.");
      })
      .catch((e) => reject(e + ": 인증메일 오류입니다."));
  });
};

export const sendResetpwEmail = (auth, email) => {
  console.log(email);
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        resolve("비밀번호 변경 이메일을 전송했습니다.");
      })
      .catch((e) => reject(e)); //이벤트가 아니고 에러...
  });
};
