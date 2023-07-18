import {Link} from "react-router-dom"

const Nav = ()=>{
    return (
    <nav className="navBar">
         <h2>Nav Here</h2>
         <ul>
            <li>
                <Link className="link" to = {"/"}>
                    <button>Home</button>
                </Link>
                <Link className="link" to = {"/articles"}>
                    <button>Articles</button>
                </Link>
                <Link className="link" to = {"/topics"}>
                    <button>Topics</button>
                </Link>
                <Link className="link" to = {"/users"}>
                    <button>Profile</button>
                </Link>
            </li>
         </ul>
    </nav>
   )}
   
   
   export default Nav