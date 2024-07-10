import Submit from "@components/Submit";

function Search({ keyword, setKeyword }) {
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
