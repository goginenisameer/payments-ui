import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext, LoginContextType, UserType } from "../../context/context";



//if the user is logged in render name

const Menu = () : JSX.Element => {

    const contextPointer = useContext<LoginContextType>(LoginContext);

const userdetails:UserType=contextPointer.user
    return (
        <ul className="nav">
            <li><Link to="/find">Find a transaction</Link></li>
            <li><Link to="/add">New transaction</Link></li>
            <li>
            {userdetails.name==="" && <Link to="/signin">Signin</Link> }
            </li>
             <p>logged in user:{userdetails.name} </p> 

        </ul>
    );
}

export default Menu;
