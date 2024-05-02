import { createContext } from "react";

export type UserType = {
  id: number;
  name: string;
  role: string;
};

export type LoginContextType = {
  user: UserType;
  login: (user: UserType) => void;
  logout: () => void;
};


export const LoginContext: React.Context<LoginContextType> = createContext<LoginContextType>(
    {
    user: {
        id: 0,
        name:"",
        role: ""
    },
    login: () => {},
    logout: () => {}
}
)
