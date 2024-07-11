import Submit from "@components/Submit";

type Search = {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};

function Search({ keyword, setKeyword }: Search) {
  return (
    <form>
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Submit>검색</Submit>
    </form>
  );
}

export default Search;
