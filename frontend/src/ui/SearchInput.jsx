function SearchInput() {
  return (
    <div className="join ">
      <div className=" ">
        <div>
          <input
            className="input input-sm md:input-md sm:input-md md:w-[300px] input-bordered join-item"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="indicator">
        <button className="btn btn-sm md:btn-md sm:btn-md join-item">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
