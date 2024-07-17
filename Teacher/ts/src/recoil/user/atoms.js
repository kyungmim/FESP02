import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

//key값으로 로그인 정보를 스토리지에 저장
const { persistAtom } = recoilPersist({
  key: "loginUser",
  //저장소 세션,,로컬,,등등 정해주기
  storage: sessionStorage,
});

export const userState = atom({
  key: "userState",
  default: null,
  //익스텐션같이 생각하면 됨.
  effects: [persistAtom],
});
