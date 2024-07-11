import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { postState } from "@recoil/user/atoms.mts";
import { Item } from "types/community";

type Props = {
  item: Item;
  index: number;
};

function ListItem({ item, index }: Props) {
  const navigate = useNavigate();
  const setPostId = useSetRecoilState(postState);
  const handleDetail = () => {
    setPostId(item);
    navigate(`/info/${item._id}`);
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">{index + 1}</td>
      <td
        className="p-2 truncate indent-4 cursor-pointer"
        onClick={handleDetail}
      >
        {item.title}
      </td>
      <td className="p-2 text-center truncate">{item.user.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">
        {item.repliesCount}
      </td>
      <td className="p-2 truncate text-center hidden sm:table-cell">
        {item.createdAt}
      </td>
    </tr>
  );
}

export default ListItem;
