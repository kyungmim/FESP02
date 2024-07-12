import Button from "@components/Button";
import useFetch from "@hooks/useFetch";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ListItem from "./ListItem";
import Search from "@components/Search";
import { useEffect, useState } from "react";
import Pagination from "@components/Pagination";

function List() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { type } = useParams();
  const page = searchParams.get("page") || 1;
  const { data, loading, error, refetch } = useFetch(
    `/posts?type=${type}&limit=10&keyword=${keyword}&page=${page}`
  );

  const ListItems = data?.item.map((item, index) => (
    <ListItem key={item._id} item={item} index={index} type={type} />
  ));

  useEffect(() => {
    refetch();
    searchParams.set("page", 1);
    setSearchParams(searchParams);
    // 키워드로 인해 링크가 바뀌면 데이터값이
    // limit값 + 현재페이지 넘버 값보다 많으면 뜨지만 만약 1개인경우 값이 1개이기 떄문에
    // 1페이지에 검색된거지만 현재페이지는 1페이지 이상에 있으면 값이 나오기 않기 때문에
    // 검색시 1로 초기화 시켜줘야함
  }, [keyword]);

  useEffect(() => {
    refetch();
  }, [page, type]);

  let url = useLocation().pathname;

  let title = "";
  switch (url) {
    case "/info":
      title = "정보공유";
      break;
    case "/post":
      title = "자유게시판";
      break;
    case "/qna":
      title = "질문게시판";
      break;
    default:
      title = "정보공유";
  }

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          {title}
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <Search keyword={keyword} setKeyword={setKeyword} />

        <Button onClick={() => navigate(`/info/new`)}>글작성</Button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  로딩중...
                </td>
              </tr>
            ) : (
              ""
            )}

            {error ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  에러 메세지
                </td>
              </tr>
            ) : (
              ""
            )}

            {/* 본문 출력 */}
            {ListItems}
          </tbody>
        </table>
        <hr />

        {/* 페이지네이션 */}
        <Pagination totalPages={data?.pagination.totalPages} />
      </section>
    </main>
  );
}

export default List;
