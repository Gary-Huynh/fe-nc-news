
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext";
import { getUsers } from "../../api";




const UserList = ()=>{
const [users, setUsers] = useState([])
const {user, setUser} = useContext(UserContext)
const [error, setError] = useState(false)
const [isLoading, setIsLoading] =useState(true)
const [loginUser, setLoginUser] = useState({user:""})
const [clickedLogin, setClickedLogin] =useState(false)

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


    const handleSubmit = (e) =>{
        e.preventDefault()
        setClickedLogin(true)
        users.map((singleUser)=>{
            if(loginUser.user === (singleUser).username){
                setUser((singleUser).username)
            alert("Login successful")
            setClickedLogin(false)}

            
        })
        setLoginUser({user:""})
    }


    if(isLoading) {return <h1>Loading now...</h1>}
    if(error){return <h1>Something went wrong try again later 🙄</h1>}
    
return(
    <main >
        <h3 className="userProfile">User Profiles</h3>

        <form  onSubmit={handleSubmit}>
            <label id="userLabel" htmlFor="enterUsername">{user===null? "Please enter your Username" : "Change user?"}</label>
            <input id="enterUsername" 
            value={loginUser.user}
            onChange={((e)=>{
            setLoginUser({user:e.target.value})})}
             required></input>
            <button id="deleteButton">Submit</button>
        </form>

        {clickedLogin? <p>Login failed</p>  : null}




        
        {users.map((singleUser)=>{

            if (singleUser.username === user){
            return( 
            <section className="user" key={singleUser.username} >
            <h2>Username: {singleUser.username}</h2>
            <h3>Full Name: {singleUser.name}</h3>

            <img className="image" width="250px"src={singleUser.avatar_url}/>

            </section>
            )}
            else{ return null}
        })}
    </main>
)



}


export default UserList