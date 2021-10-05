import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";

import { useToast } from "@chakra-ui/react";

import { useHistory } from "react-router-dom";

export const AuthContext = createContext({} as AuthContextData);

interface SignInProps {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInProps): Promise<void>;
  signOut(): Promise<void>;
  isSigned: boolean;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [isSigned, setIsSigned] = useState(false);
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    setIsSigned(false);
  }, []);

  const signIn = useCallback(
    async ({ email, password }: SignInProps) => {
      new Promise((resolve) => setTimeout(resolve, 100)).then((resp) => {
        const check =
          email === "admin@admin.com" && password === "admin@123"
            ? true
            : false;

        if (check) {
          setIsSigned(true);
          history.push("/");
          return;
        } else {
          setIsSigned(false);
          toast({
            title: "Credenciais não conferem",
            status: "error",
            isClosable: true,
          });
          return;
        }
      });
    },
    [history, toast]
  );

  const signOut = useCallback(async () => {
    new Promise((resolve) => setTimeout(resolve, 100)).then((resp) => {
      setIsSigned(false);
      history.push("/");
      return;
    });
  }, [history]);

  return (
    <AuthContext.Provider value={{ isSigned, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useReactAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useReactAuth must be used within an AuthProvider");
  }

  return context;
}
