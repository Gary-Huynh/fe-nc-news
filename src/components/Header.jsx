import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link } from "react-router-dom"


const Header = ()=>{


const {user} = useContext(UserContext)


 return (
        
        <main >
            <section className="header">
            <h1 id="mainHeader">NC-News</h1>
            <h2 id="subHeader" >Bringing you all the latest events</h2>
            {user !== null?
            <h2 id="userHeader">Logged in as {user}</h2>:
            <Link className="link" to = {"/users"}>
             <h2 id="userHeader"> Login here</h2>
            </Link>
}
            </section>
        </main>)
}


export default Header