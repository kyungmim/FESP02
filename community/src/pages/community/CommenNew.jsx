import Submit from "@components/Submit";
import useFetch from "@hooks/useFetch";
import useMutation from "@hooks/useMutation";
import { memberState, postState } from "@recoil/user/atoms.mjs";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

function CommentNew() {
  const { handleSubmit, register } = useForm();
  const postId = useRecoilValue(postState);
  const user = useRecoilValue(memberState);
  const { send } = useMutation(`/posts/${postId._id}/replies`, {
    method: "POST",
  });
  const { refetch } = useFetch(`/posts/${postId._id}/replies`);

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const token = user.token.accessToken;
      await send({
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      refetch();
      window.location.reload();
    } catch (err) {
      alert(`에러 ${err.message}`);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            {...register("content")}
          ></textarea>
          {/* 
          <p className="ml-2 mt-1 text-sm text-red-500">
            에러 메세지
          </p> */}
        </div>
        <Submit size="sm">댓글 등록</Submit>
      </form>
    </div>
  );
}

export default CommentNew;
