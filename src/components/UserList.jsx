
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext";
import { getUsers } from "../../api";




const UserList = ()=>{
const [users, setUsers] = useState([])
const {user, setUser} = useContext(UserContext)
const[error, setError] = useState(false)
const [isLoading, setIsLoading] =useState(true)


    useEffect(()=>{
        setIsLoading(true)
        setError(true)
        getUsers()
        .then((res)=>{
            setUsers(res.allUsers)
            setIsLoading(false)
            setError(false)
        })
        .catch(err =>{
            setApiError(err)
            setIsLoading(false)
            setError(true)
    
        })
    },[])
    if(isLoading) {return <h1>Loading now...</h1>}
    if(error){return <h1>Something went wrong try again later 🙄</h1>}
    
return(
    <main >
        <h3 className="userProfile">User Profiles</h3>

        {users.map((user)=>{
            return( 
            <section className="user" key={user.username} >
            <h2>Username: {user.username}</h2>
            <h3>Full Name: {user.name}</h3>
            <button className="userButton" onClick={()=>{
                setUser(user.username)
                alert(`logged in as ${user.username}`)
            }}>Login
            </button>
            <img className="image" width="250px"src={user.avatar_url}/>

            </section>
            )
        })}
    </main>
)



}


export default UserList