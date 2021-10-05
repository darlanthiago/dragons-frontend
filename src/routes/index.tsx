import { AppLayout } from "../components/Layout/app";
import { AppRoutes } from "./app.routes";
import { PublicRoutes } from "./public.routes";

export const Routes = () => {
  const isSigned = true;

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
