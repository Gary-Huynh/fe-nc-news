import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"


const Header = ()=>{


const {user} = useContext(UserContext)


 return (
        
        <main >
            <section className="header">
            <h1 id="mainHeader">NC-News</h1>
            <h2 id="subHeader" >Bringing you all the latest events</h2>
            <h2 id="userHeader">Logged in as {user}</h2>
            </section>
        </main>)
}


export default Header