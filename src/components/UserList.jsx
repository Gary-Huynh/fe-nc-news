
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext";
import { getUsers } from "../../api";




const UserList = ()=>{
const [users, setUsers] = useState([])
const {user, setUser} = useContext(UserContext)



    useEffect(()=>{
        getUsers()
        .then((res)=>{
            setUsers(res.allUsers)
        })
    },[])

return(
    <main >
        {users.map((user)=>{
            return( 
            <section key={user.username} >
            <h2>Username: {user.username}</h2>
            <h3>Full Name: {user.name}</h3>
            <img onClick={()=>{
                setUser(user.username)
                alert(`logged in as ${user.username}`)
            }} className="image" width="400px"src={user.avatar_url}/>
            
            </section>
            )
        })}
    </main>
)



}


export default UserList