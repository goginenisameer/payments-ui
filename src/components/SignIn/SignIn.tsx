import { useContext } from "react";
import { LoginContext, LoginContextType } from "../../context/context";

const SignIn = (): JSX.Element => {
  const contextPointer = useContext<LoginContextType>(LoginContext);

  const handleLogin = (): void => {
    contextPointer.login({ id: 1, name: "Matt T", role: "admin" });
  };

  return (
    <>
      <p>This is where the login form would</p>
      <button onClick={handleLogin}> Log in</button>
    </>
  );
};

export default SignIn;