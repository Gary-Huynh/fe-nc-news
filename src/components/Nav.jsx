import {Link} from "react-router-dom"

const Nav = ()=>{
    return (
    <nav className="navBar">
         <h2>Nav Here</h2>
         <ul>
            <li>
                <Link className="link" to = {"/articles"}>
                    <button>Articles</button>
                </Link>
            </li>
         </ul>
    </nav>
   )}
   
   
   export default Nav