import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getAdminUsers } from "../../services/apiProduct";

function useGetUser(pageNum) {
  const { data, isLoading } = useQuery({
    queryKey: ["adminUser", pageNum],
    queryFn: () => getAdminUsers(pageNum),
    onError: (err) => toast.error(err.response.data.message),
  });

  return { data, isLoading };
}

export default useGetUser;
