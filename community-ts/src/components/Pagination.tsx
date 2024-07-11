import { Link } from "react-router-dom";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li className="text-bold text-blue-700" key={i}>
        <Link to={`/post?page=${i}`}>{i}</Link>
      </li>
    );
  }

  return (
    <div>
      <ul className="flex justify-center gap-3 m-4">{pages}</ul>
    </div>
  );
};

export default Pagination;
