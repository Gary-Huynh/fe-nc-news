import {Link} from "react-router-dom"

const Nav = ()=>{
    return (
    <nav className="navBar">
         <ul>
            <li>
                <Link className="link" to = {"/"}>
                    <p>Home</p>
                </Link>
                <Link className="link" to = {"/articles"}>
                    <p>Articles</p>
                </Link>
                <Link className="link" to = {"/topics"}>
                    <p>Topics</p>
                </Link>
                <Link className="link" to = {"/users"}>
                    <p>Profile</p>
                </Link>
            </li>
         </ul>
    </nav>
   )}
   
   
   export default Nav