import Submit from "@components/Submit";
import { useForm } from "react-hook-form";

function Search({ key, setKey }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setKey(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
