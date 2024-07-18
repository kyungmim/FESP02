import InputError from "@/components/InputError";
import Submit from "@/components/Submit";
import { userState } from "@/recoil/user/atoms";
import { ApiRes, PostComment, SingleItem } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const SERVER = import.meta.env.VITE_API_SERVER;

type CommentItem = {
  content: string;
};

async function addComment(
  postId: string | undefined,
  formData: CommentItem,
  accessToken: string
): Promise<ApiRes<SingleItem<PostComment>>> {
  const res = await fetch(`${SERVER}/posts/${postId}/replies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}

export default function CommentNew() {
  const queryClient = useQueryClient();
  const user = useRecoilValue(userState);
  const { _id, type } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentItem>();

  const { mutate } = useMutation<
    ApiResWithValidation<SingleItem<Post>, LoginForm>,
    Error,
    LoginForm
  >({
    mutationFn(formData) {
      return addComment(_id, formData, user?.accessToken);
    },
    onSuccess(resData) {
      //댓글 목록 새로고침
      if (resData.ok) {
        //캐시제거
        //현재 쿼리로 댓글들이 저장되어있는데 들어간 게시물의 댓글 캐시를 지우겠따
        //캐시시킨 키값 똑같이 입력해야함
        queryClient.invalidateQueries({
          queryKey: [type, _id, "replies"],
        });
      } else {
        console.error(resData.message);
      }
    },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form action="#" onSubmit={handleSubmit(mutate)}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            {...register("content", {
              required: "내용은 필수입니다.",
              minLength: "2글자 이상 입력하세요.",
            })}
          ></textarea>
          <InputError target={errors.content} />
        </div>
        <Submit size="sm">댓글 등록</Submit>
      </form>
    </div>
  );
}
