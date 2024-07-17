import InputError from "@/components/InputError";
import Submit from "@/components/Submit";
import { userState } from "@/recoil/user/atoms";
import { ApiResWithValidation, SingleItem, User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const SERVER = import.meta.env.VITE_API_SERVER;

type LoginForm = {
  email: string;
  password: string;
};

async function login(
  formData: LoginForm
): Promise<ApiResWithValidation<SingleItem<User>, LoginForm>> {
  const res = await fetch(`${SERVER}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return res.json();
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  //상태값 변경
  const setUser = useSetRecoilState(userState);

  //mutation
  //등록 수정 삭제 는 사용자의 액션이 필요로하는것
  //mutate가 호출될때 아래 mutationFn이 호출됨
  //type: useMutation(TData = unknown ,TError=DefaultError,TVariables=void,...)
  //TData:mutaitionFn 리턴타입 (resData)
  //TError:발생하는 에러의 타입 (onError)
  // TVariables: mutationFn 인자값의 타입 (formData)
  const { mutate } = useMutation<
    ApiResWithValidation<SingleItem<User>, LoginForm>,
    Error,
    LoginForm
  >({
    //일시적인 서버의 오류나 잠시 오류가 났을 경우 데이터 통신을 n번 시도할 수 있게 해줌
    // retry:3,
    mutationFn(formData) {
      return login(formData);
    },
    //결과를 받는 함수
    onSuccess(resData) {
      if (resData.ok) {
        //로그인 상태 저장
        setUser({
          _id: resData.item._id,
          name: resData.item.name,
          profile: resData.item.profileImage,
          accessToken: resData.item.token!.accessToken,
          refreshToken: resData.item.token!.refreshToken,
        });
        alert(`${resData.item.name}님 로그인 되었습니다. :)`);
        navigate("/");
      } else {
        //api서버에서 에러 응답
        if ("errors" in resData) {
          resData.errors.forEach((error) =>
            setError(error.path, {
              message: error.msg,
            })
          );
        } else if (resData.message) {
          alert(resData.message);
        }
      }
    },
    //함수 실행중 발생하는 에러는 아래 함수가 호출됨
    onError(err) {
      //네트워크 에러
      console.log(err.message);
      alert("잠시후 다시 이용해 주세요");
    },
  });

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form
          action="/"
          onSubmit={handleSubmit((formData) => mutate(formData))}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
            />
            <InputError target={errors.email} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
              })}
            />
            <InputError target={errors.password} />
            <Link
              to="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Submit>로그인</Submit>
            <Link
              to="/user/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
