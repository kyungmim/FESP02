import Button from "@components/Button";
import useFetch from "@hooks/useFetch";
import useMutation from "@hooks/useMutation";
import { memberState, postState } from "@recoil/user/atoms.mjs";
import { useRecoilValue } from "recoil";

function CommentItem({ item }) {
  const postId = useRecoilValue(postState);
  const memberId = useRecoilValue(memberState);
  const { refetch } = useFetch(`/posts/${postId._id}/replies`);
  const { send } = useMutation(`/posts/${postId._id}/replies/${item._id}`);

  const handleDelete = async () => {
    let isDelete = confirm("삭제하시겠습니까??");
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
      refetch();
      window.location.reload();
    } catch (err) {
      alert(`에러 ${err.message}`);
    }
  };

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          className="w-8 mr-2 rounded-full"
          src={`http://api.fesp.shop${
            item.user.profile
              ? item.user.profile.path
                ? `${item.user.profile.path}`
                : `${item.user.profile}`
              : `/files/00-sample/XPTwYP2nb.png`
          }`}
          alt="프로필"
        />
        <p className="text-orange-400">{item.user.name}</p>
        <time className="ml-auto text-gray-500" dateTime="2024.07.07 12:34:56">
          {item.createdAt}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <pre className="whitespace-pre-wrap text-sm">{item.content}</pre>
        {item.user._id === memberId._id ? (
          <Button bgColor="red" size="sm" onClick={handleDelete}>
            삭제
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CommentItem;
