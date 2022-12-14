import axios from 'axios';
import { getCookie } from "./cookie";

export const instance = axios.create({ // axios 인스턴스를 생성합니다.
    baseURL: process.env.REACT_APP_HOST_PORT,
  });

instance.interceptors.request.use(     //1. 요청 인터셉터 : 2개의 콜백 함수를 받습니다.
    (config) => { // instance 요청 성공 직전 호출됩니다. axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
        const token = getCookie("ACCESS_TOKEN");
        const refreshToken = getCookie("REFRESH_TOKEN");
        const AccessToken = localStorage.getItem("ACCESS_TOKEN");
        const RefreshToken = localStorage.getItem("REFRESHTOKEN");
        // console.log(token)
        if (AccessToken === null) {
            config.headers.Authorization = token;
            config.headers.refreshToken = refreshToken;
        } else {
            config.headers.Authorization = AccessToken;
            config.headers.refreshToken = RefreshToken;
        };
        return config;
    }, 
    (error)=> { // 요청 에러 직전 호출됩니다.
        return Promise.reject(error);
    }
);


/*
    2. 응답 인터셉터
    2개의 콜백 함수를 받습니다.
*/
// instance.interceptors.response.use(
//     (response) => {
//     /*
//         http status가 200인 경우
//         응답 성공 직전 호출됩니다. 
//         .then() 으로 이어집니다.
//     */
//         return response;
//     },

//     (error) => {
//     /*
//         http status가 200이 아닌 경우
//         응답 에러 직전 호출됩니다.
//         .catch() 으로 이어집니다.    
//     */
//         return Promise.reject(error);
//     }
// );


// import axios from "axios";
// import { getCookie } from "./cookie";

// export const instance = axios.create({
//   baseURL: "http://52.79.247.187:8080",
// });

// instance.interceptors.request.use((config) => {
//   const token = getCookie("ACCESS_TOKEN");
//   const refreshToken = getCookie("REFRESH_TOKEN");

//   config.headers.Authorization = token;
//   config.headers.refreshToken = refreshToken;

//   return config;
// });