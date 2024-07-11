import Button from "@components/Button";
import useFetch from "@hooks/useFetch";
import { memberState, postState } from "@recoil/user/atoms.mjs";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import CommentList from "./CommentList";
import useMutation from "@hooks/useMutation";
import { ObjResponse } from "types/community";

function Detail() {
  const postId = useRecoilValue(postState);
  const memberId = useRecoilValue(memberState);
  const { data } = useFetch<ObjResponse>(`/posts/${postId._id}`);
  const { send } = useMutation(`/posts/${postId._id}`);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/info/${postId}/edit`);
  };

  const handleDelete = async () => {
    const isDelete = confirm("삭제하시겠습니까??");
    try {
      const token = memberId.token.accessToken;
      if (isDelete) {
        await send({
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate(`/info`);
    } catch (err) {
      if (err instanceof TypeError) {
        alert(`에러 ${err.message}`);
      } else if (err instanceof Error) {
        alert(`에러 ${err.message}`);
      }
    }
  };

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">제목 : {data?.item.title}</div>
        <div className="text-right text-gray-400">
          작성자 : {data?.item.user.name}
        </div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {data?.item.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Button onClick={() => navigate("/post")}>목록</Button>
          {data?.item.user._id === memberId._id ? (
            <>
              <Button bgColor="gray" onClick={handleEdit}>
                수정
              </Button>
              <Button bgColor="red" onClick={handleDelete}>
                삭제
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      </section>
      <CommentList />
    </main>
  );
}

export default Detail;
