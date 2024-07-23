import CommentItem from "./CommentItem";
import CommtentNew from "./CommentNew";

export interface CommentType {
  params: {
    id: string;
    type: string;
  };
}

export default function CommentList({ params }: CommentType) {
  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 2개</h4>

      <CommentItem params={params} />
      <CommtentNew />
    </section>
  );
}
