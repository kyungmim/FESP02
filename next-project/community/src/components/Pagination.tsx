import Link from "next/link";

type Page = {
  type: string;
};

export default function Pagination({ type }: Page): JSX.Element {
  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">
        <li className="font-bold text-blue-700">
          <Link href={`/${type}?page=1`}>1</Link>
        </li>
        <li>
          <Link href={`/${type}?page=2`}>2</Link>
        </li>
      </ul>
    </div>
  );
}
