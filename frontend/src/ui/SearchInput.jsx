import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const navigate = useNavigate();
  const [searchQueries, setSearchQuery] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSearchParams({ search: formData.get("search") });
    setSearchQuery(e.target.value);
    navigate(`/search/${formData.get("search")}`);
  };

  return (
    <form onSubmit={handleSubmit} className="join ">
      <div className=" ">
        <div>
          <input
            name="search"
            className="input input-sm md:input-md sm:input-md md:w-[300px] input-bordered join-item"
            placeholder="Search"
            value={searchQueries}
          />
        </div>
      </div>

      <div className="indicator">
        <button
          type="submit"
          className="btn btn-sm md:btn-md sm:btn-md join-item"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchInput;
