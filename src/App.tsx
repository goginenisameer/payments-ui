import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PageHeader from "./components/pageHeader/PageHeader";
import Search from "./components/Search/Search";
import Transactions from "./components/Transactions/Transactions";

import { useState } from "react";
import { LoginContext, LoginContextType, UserType } from "./context/context";
import NewTransaction from "./components/NewTrasaction/NewTrasaction";
import SignIn from "./components/SignIn/SignIn";

function App(): JSX.Element {
  const [user, setUser] = useState<UserType>({ id: 0, name: "", role: "" });

  console.log(user);

  const login = (user: UserType) => {
    setUser(user);
  };

  const logout = () => {
    setUser({ id: 0, name: "", role: "" });
  };

  const statefulContext: LoginContextType = {
    user: user,
    login: login,
    logout: logout,
  };

  return (
    <LoginContext.Provider value={statefulContext}>
      <BrowserRouter>
        <PageHeader />
        <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
          <Route
            path="/find"
            element={
              <>
                <Search />
                <Transactions />
              </>
            }
          />
          <Route path="/add" element={<NewTransaction />} />
          <Route path="/" element={<h1>Payments system</h1>} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
