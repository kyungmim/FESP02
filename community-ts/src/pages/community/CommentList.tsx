import CommentNew from "./CommenNew";
import { useRecoilValue } from "recoil";
import { postState } from "@recoil/user/atoms.mjs";
import useFetch from "@hooks/useFetch";
import CommentItem from "./CommentItem";
import { IResponse } from "types/community";

function CommentList() {
  const postId = useRecoilValue(postState);
  const { data } = useFetch<IResponse>(`/posts/${postId._id}/replies`);

  const comments = data?.item.map((item) => (
    <CommentItem key={item._id} item={item} />
  ));

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {data?.item.length}개</h4>
      {comments}
      <CommentNew />
    </section>
  );
}

export default CommentList;
