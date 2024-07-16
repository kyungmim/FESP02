import CommentItem from "@/pages/community/CommentItem";
import CommentNew from "@/pages/community/CommentNew";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const SERVER = import.meta.env.VITE_API_SERVER;

async function fetchComments(_id) {
  const url = `${SERVER}/posts/${_id}/replies`;
  const res = await fetch(url);
  return res.json();
}

// export default function CommentList({ replies }) {
export default function CommentList() {
  const { type, _id } = useParams();
  const { data } = useQuery({
    queryKey: [type, _id, "replies"],
    queryFn: () => {
      return fetchComments(_id);
    },
    select: (response) => response.item,
    staleTime: 1000 * 3,
  });

  const list = data?.map((item) => <CommentItem key={item._id} item={item} />);

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {data?.length || 0}개</h4>
      {list}
      <CommentNew />
    </section>
  );
}
