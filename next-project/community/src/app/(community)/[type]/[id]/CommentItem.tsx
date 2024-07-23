import Image from "next/image";
import { CommentType } from "./CommenList";
import Submit from "@/components/Submit";

export default function CommentItem({ params }: CommentType) {
  return (
    <>
      <div className="shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <Image
            className="w-8 mr-2 rounded-full"
            width="8"
            height="8"
            src="/images/favicon.svg"
            alt="어피치 프로필 이미지"
          />
          <a href="" className="text-orange-400">
            어피치
          </a>
          <time
            className="ml-auto text-gray-500"
            dateTime="2024.07.02 14:11:22"
          >
            2024.07.02 14:11:22
          </time>
        </div>
        <div className="flex justify-between items-center mb-2">
          <form action={`/${params.type}`}>
            <pre className="whitespace-pre-wrap text-sm">화이팅!</pre>
            <Submit>삭제</Submit>
          </form>
        </div>
      </div>

      <div className="shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <Image
            className="w-8 mr-2 rounded-full"
            src="/images/favicon.svg"
            alt="무지 프로필 이미지"
            width="10"
            height="10"
          />
          <a href="" className="text-orange-400">
            무지
          </a>
          <time
            className="ml-auto text-gray-500"
            dateTime="2024.07.07 12:34:56"
          >
            2024.07.07 12:34:56
          </time>
        </div>
        <div className="flex justify-between items-center mb-2">
          <form action={`/${params.type}`}>
            <pre className="whitespace-pre-wrap text-sm">축하해요~~~</pre>
            <Submit>삭제</Submit>
          </form>
        </div>
      </div>
    </>
  );
}
