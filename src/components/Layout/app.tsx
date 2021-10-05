import { Header } from "../Header";

export const AppLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />

      {children}
    </>
  );
};
