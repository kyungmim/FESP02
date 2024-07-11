import Button from "@components/Button";
import Submit from "@components/Submit";
import useMutation from "@hooks/useMutation";
import { memberState } from "@recoil/user/atoms.mts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Item, ObjResponse } from "types/community";

function New() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Item>();
  const navigate = useNavigate();
  const user = useRecoilValue(memberState);
  const { send } = useMutation("/posts/", { method: "POST" });

  const onSubmit: SubmitHandler<Item> = async (formData) => {
    try {
      const token = user.token.accessToken;
      const respons: ObjResponse = await send({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log(respons);

      navigate(`/${respons.item._id}`);
    } catch (err) {
      if (err instanceof TypeError) {
        alert(`에러 ${err.message}`);
      } else if (err instanceof Error) {
        alert(`에러 ${err.message}`);
      }
    }
  };
  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              {...register("title", {
                required: "제목을 입력해주세요.",
                minLength: {
                  value: 1,
                  message: "제목은 필수입니다.",
                },
              })}
            />

            {errors.title && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              id="content"
              rows={15}
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              {...register("content", {
                required: "내용을 입력해주세요.",
                minLength: {
                  value: 1,
                  message: "내용은 필수입니다.",
                },
              })}
            ></textarea>
            {errors.content && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.content.message}
              </p>
            )}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Submit>등록</Submit>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default New;
