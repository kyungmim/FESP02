import { Link, useParams, useSearchParams } from "react-router-dom";

export default function Pagination({ page, totalPages }) {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    searchParams.set("page", String(i));
    const search = searchParams.toString(); // ex) keyword=hello&page=2
    pages.push(
      <li key={i} className={page === i ? "font-bold text-blue-700" : ""}>
        <Link to={`/${type}?${search}`}>{i}</Link>
      </li>
    );
  }

  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">{pages}</ul>
    </div>
  );
}
