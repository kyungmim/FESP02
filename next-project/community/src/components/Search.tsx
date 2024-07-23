import Submit from "@/components/Submit";
import { useState } from "react";

export default function Search() {
  const [keyword, setKeyword] = useState("");

  // const handleSearch = (e) => {
  //   e.preventDefault();
  // navigate(`?keyword=${keyword}`);
  // };

  return (
    // <form action="#" onSubmit={handleSearch}>
    <form action="#">
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Submit>검색</Submit>
    </form>
  );
}
