import Submit from "@components/Submit";
import { useRef } from "react";
import { useForm } from "react-hook-form";

function Search({ keyword, setKeyword }) {
  const { register, handleSubmit } = useForm();

  const handleSearch = (data) => {
    // console.log(data.keyword);
    setKeyword(data.keyword);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        {...register("keyword")}
      />
      <Submit>검색</Submit>
    </form>
  );
}

export default Search;
