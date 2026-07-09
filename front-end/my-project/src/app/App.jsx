import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./app.rout";
import { useAuth } from "../features/auth/hook/useAuth";
import { useEffect } from "react";
const App = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.handlegetMe();
  }, []);
  
  return <RouterProvider router={router} />;
};

export default App;