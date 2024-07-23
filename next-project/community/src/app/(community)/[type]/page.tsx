import Pagination from "@/components/Pagination";
import { Metadata } from "next";
import Link from "next/link";
import ListItem from "./ListItem";

export function generateMetadata({
  params,
}: {
  params: { type: string };
}): Metadata {
  const boardName = params.type;
  return {
    title: `${boardName} - 멋사컴`,
    description: `${boardName} 게시판입니다.`,
    openGraph: {
      title: `${boardName} - 멋사컴`,
      description: `${boardName} 게시판입니다.`,
      url: `/${params.type}`,
      images: {
        url: "/images/fesp.webp",
      },
    },
  };
}

interface DataType {
  item: [
    type: string,
    _id: number,
    title: string,
    views: string,
    _id: number,
    repliesCount: string,
    _id: number,
    createdAt: string,
    user: {
      name: string;
    }
  ];
}

export default function Type({
  params,
}: {
  params: { id: string; type: string };
}) {
  const data: DataType = {
    item: [
      {
        type: "info",
        _id: 2,
        title: "안녕하세요",
        views: 29,
        repliesCount: 2,
        createdAt: "2024.07.05 13:39:23",
        user: {
          name: "용쌤",
        },
      },
      {
        type: "info",
        _id: 1,
        title: "좋은 소식이 있습니다",
        views: 22,
        repliesCount: 5,
        createdAt: "2024.07.03 17:59:13",
        user: {
          name: "제이지",
        },
      },
    ],
  };

  const listItem = data.map((item) => {
    <ListItem item={item} />;
  });

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          정보 공유
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        <form action={`/${params.type}`}>
          <input
            className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
            type="text"
            name="keyword"
          />
          <button
            type="submit"
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          >
            검색
          </button>
        </form>

        <a
          href={`/${params.type}/new`}
          className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        >
          글작성
        </a>
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
          <tbody></tbody>
        </table>
        <hr />

        <Pagination type={params.type} />
      </section>
    </main>
  );
}
