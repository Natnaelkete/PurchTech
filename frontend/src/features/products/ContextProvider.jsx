import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const queryContext = createContext();

function ContextProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get("page") || 1);
  const initialSearch = queryParams.get("search") || "";

  const [pageNum, setPageNum] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = Number(queryParams.get("page") || 1);
    const search = queryParams.get("search") || "";
    setPageNum(page);
    setSearchQuery(search);
  }, [location.search]);

  const updateUrlParams = (page, search) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page);
    if (search) params.set("search", search);

    navigate(`?${params.toString()}`, { replace: true });
  };

  const onChangePage = (page) => {
    setPageNum(page);
    updateUrlParams(page, searchQuery);
  };

  const onSearchChange = (search) => {
    setSearchQuery(search);
    updateUrlParams(pageNum, search);
  };

  return (
    <queryContext.Provider
      value={{ pageNum, searchQuery, onChangePage, onSearchChange }}
    >
      {children}
    </queryContext.Provider>
  );
}

function useQuery() {
  const context = useContext(queryContext);
  if (context === undefined) {
    throw new Error("useQuery must be used within a ContextProvider");
  }
  return context;
}

export { ContextProvider, useQuery };
