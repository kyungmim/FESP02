import Submit from "@/components/Submit";
import CommentList from "@/pages/community/CommentList";
import { userState } from "@/recoil/user/atoms";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useRecoilValue } from "recoil";
// import { useEffect, useState } from "react";

const SERVER = import.meta.env.VITE_API_SERVER;

async function fetchPost(_id: string) {
  const url = `${SERVER}/posts/${_id}`;
  const res = await fetch(url);
  return res.json();
}

export default function Detail() {
  const { _id, type } = useParams();
  const user = useRecoilValue(userState);

  const { data, isLoading } = useQuery({
    queryKey: [type, _id],
    queryFn: () => {
      //undefined 가 될수 없다!
      return fetchPost(_id!);
    },
    //최종 리턴하는 값
    // select:res => res.item
    staleTime: 1000 * 3,
  });

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <form action={`/${type}`}>
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
            <Link
              to={`/${type}`}
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              목록
            </Link>
            {user?._id === data?.item.user._id && (
              <>
                <Link
                  to={`/${type}/${_id}/edit`}
                  className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                >
                  수정
                </Link>
                <Submit bgColor="red">삭제</Submit>
              </>
            )}
          </div>
        </form>
      </section>

      {isLoading && <PacmanLoader color="#F97316" />}

      {/* <CommentList item={data?.item.replies} /> */}
      <CommentList />
    </main>
  );
}
