import Theme from "@/components/Theme";
import { Link } from "react-router-dom";
// import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useRecoilState } from "recoil";
import Submit from "../Submit";
import { userState } from "@/recoil/user/atoms";

export default function Header() {
  // const user = useRecoilValue(userState);
  // const setUser = useSetRecoilState(userState);
  const [user, setUser] = useRecoilState(userState);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="mr-3 h-6 sm:h-9"
              src="/images/favicon.svg"
              width="40"
              height="40"
              alt="로고 이미지"
            />
            <span className="text-lg font-bold">멋사컴</span>
          </Link>
        </div>
        <div className="w-auto order-2 text-base mt-4 md:mt-0">
          <ul className="flex items-center gap-6 uppercase">
            <li className="hover:text-amber-500 hover:font-semibold">
              <Link to="/info">정보공유</Link>
            </li>
            <li className="hover:text-amber-500 hover:font-semibold">
              <Link to="/free">자유게시판</Link>
            </li>
            <li className="hover:text-amber-500 a:font-semibold">
              <Link to="/qna">질문게시판</Link>
            </li>
          </ul>
        </div>

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
          {user ? (
            <form action="/" onSubmit={handleLogout}>
              <p className="flex items-center">
                <img
                  className="w-8 rounded-full mr-2"
                  src={`${import.meta.env.VITE_API_SERVER}${user.profile}`}
                  width="40"
                  height="40"
                  alt="프로필 이미지"
                />
                {user.name} 님:)
                <Submit>로그아웃</Submit>
              </p>
            </form>
          ) : (
            <div className="flex justify-end">
              <Link
                to="/user/login"
                className="bg-orange-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                로그인
              </Link>
              <Link
                to="/user/signup"
                className="bg-gray-900 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                회원가입
              </Link>
            </div>
          )}

          <Theme />
        </div>
      </nav>
    </header>
  );
}
