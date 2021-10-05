import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthContext";
import { Routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
