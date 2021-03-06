import { AppLayout } from "../components/Layout/app";
import { useReactAuth } from "../hooks/AuthContext";
import { AppRoutes } from "./app.routes";
import { PublicRoutes } from "./public.routes";

export const Routes = () => {
  const { isSigned } = useReactAuth();

  return isSigned ? (
    <>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </>
  ) : (
    <PublicRoutes />
  );
};
