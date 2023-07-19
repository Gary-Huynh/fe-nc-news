import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"


const Header = ()=>{
    const {user} = useContext(UserContext)
 return (<main>
            <h1 className="header">HEADER HERE!</h1>
            <h2>Logged in as {user}</h2>
        </main>)
}


export default Header