import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../query";

export default function ProtectedRoute() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["auth-check"],
    queryFn: checkAuth,
    retry: false,
  });

  if (isLoading) return null;
  if (isError || !data?.authenticated) return <Navigate to="/auth" replace />;

  return <Outlet />;
}
