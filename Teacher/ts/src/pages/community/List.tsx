import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
// import Spinner from "@/components/Spinner";
import ListItem from "@/pages/community/ListItem";
import { ApiRes, MultiItem, Post } from "@/types";
// import { useEffect, useState } from "react";
// import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const SERVER = import.meta.env.VITE_API_SERVER;

async function fetchPosts(
  type: string | undefined,
  page: string | null,
  keyword: string | null
): Promise<ApiRes<MultiItem<Post>>> {
  const params = new URLSearchParams();
  type && params.set("type", type);
  page && params.set("page", page);
  keyword && params.set("keyword", keyword);
  params.set("limit", import.meta.env.VITE_LIMIT);
  params.set("delay", import.meta.env.VITE_DELAY);
  const url = `${SERVER}/posts?${params.toString()}`;
  const res = await fetch(url);
  return res.json();
}

export default function List() {
  //info?page=3
  //type=inf0,qna,free..
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  // const [data, setData] = useState([]);

  // const fetchData = async () => {
  //   const result = await fetchPosts(type);
  //   setData(result.item);
  // };

  const { data, isLoading } = useQuery({
    // const { data, isLoading, error } = useSuspenseQuery({
    // query keys를 기반으로 해서 쿼리 캐싱을 관리한다.
    queryKey: [type, searchParams.toString()],
    queryFn: () => {
      const page = searchParams.get("page");
      const keyword = searchParams.get("keyword");
      return fetchPosts(type, page, keyword);
    },
    staleTime: 1000 * 10,
    //퀴리 실행후 캐시가 유지되는 시간 (기본 0)
  });

  // useEffect(() => {
  //   fetchData(type);
  // }, [type]);

  //목록을 map을 돌때 아래와 같이 선언해줘야함
  let list: JSX.Element[] = [];
  if (data?.ok) {
    list = data?.item.map((item) => <ListItem key={item._id} item={item} />);
  }

  // if (isLoading) {
  //   return <Spinner.FullScreen />;
  // }

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        <Search />

        <Link
          to={`/${type}/new`}
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        >
          글작성
        </Link>
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
            {isLoading && (
              <tr>
                <td colSpan={6} className="py-20">
                  <div className="flex justify-center">
                    <PacmanLoader color="#F97316" />
                  </div>
                </td>
              </tr>
            )}

            {list}
          </tbody>
        </table>
        <hr />

        {data?.ok && <Pagination {...data?.pagination} />}
      </section>
    </main>
  );
}
