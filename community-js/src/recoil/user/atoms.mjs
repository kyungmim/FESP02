import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "saveUser",
  storage: sessionStorage,
});

export const memberState = atom({
  key: "userState",
  default: null,
  effects: [persistAtom],
});

export const postState = atom({
  key: "postId",
  default: null,
  effects: [persistAtom],
});
