
// 브라우저가 현재의 클라이언트 호스트 이름을 얻어오는 방법
const hostname 
    = window && window.location && window.location.hostname;
// 브라우저 창이 떠있고, 이동하고 잇고, 이동을 할 때의 호스트 네임 = hostname으로 저장
console.log(hostname);

let backendHost; // 백엔드 호스트 이름
if (hostname === 'localhost') {
    backendHost = 'http://localhost:8181';
}

export const API_BASE_URL = `${backendHost}`;