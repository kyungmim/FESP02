export interface IResponse {
  ok: number;
  item: Item[];
  pagination: Page;
}

export interface ObjResponse {
  ok: number;
  item: Item;
  pagination: Page;
}

export interface LoginResponse {
  ok: number;
  item: LoginData;
}

export interface ProfileResponse {
  ok: number;
  item: Profile[];
}

export interface Item {
  title: string;
  content: string;
  _id: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  type: string;
  repliesCount: number;
  seller_id: number | null;
  tag: string;
  views: number;
}

export interface LoginData {
  _id: number;
  email: string;
  password: string;
  loginType: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  profileImage: Profile[];
  type: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface Profile {
  originalname: string;
  name: string;
  path: string;
}

export type UpDataItem = Partial<Pick<Item, "title" | "content">>;
export type LoginItem = Partial<Pick<LoginData, "email" | "password">>;

export interface SignUpItem {
  email: string;
  password: string;
  profileImage: FileList | Profile;
  name: string;
  type: "user" | "seller";
}

export interface Page {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface User {
  name: string;
  profile: {
    path: string;
  };
  _id: number;
}
