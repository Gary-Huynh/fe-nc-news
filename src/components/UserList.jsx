
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../contexts/UserContext";
import { getUsers, postUser } from "../../api";
import Expand from "./Expand";



const UserList = ()=>{
const [users, setUsers] = useState([])
const {user, setUser} = useContext(UserContext)
const [error, setError] = useState(false)
const [isLoading, setIsLoading] =useState(true)
const [loginUser, setLoginUser] = useState({user:""})
const [clickedLogin, setClickedLogin] =useState(false)
const [newUser, setNewUser] = useState({
    username:"",
    name:"",
    avatar_url:""
})
const [newUserSubmit, setNewUserSubmit] = useState(false)

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
    },[user,clickedLogin, newUserSubmit])

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);

    const handleSubmit = (e) =>{
        e.preventDefault()
        setClickedLogin(true)
        users.map((singleUser)=>{
            if(loginUser.user === (singleUser).username){
                setUser((singleUser).username)
                localStorage.setItem("user", JSON.stringify(singleUser.username))
            alert("Login successful")

            setClickedLogin(false)}


            
        })
        setLoginUser({user:""})
    }
    const handleNewUserSubmit = (e)=>{
        e.preventDefault()

         postUser(newUser)
         .then((res)=>{

            alert("Account Created")
            setNewUserSubmit(true)
         })

        setNewUser({
            username:"",
            name:"",
            avatar_url:""
        })

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
            setLoginUser({ ...newUser, user:e.target.value})})}
             required></input>
            <button id="deleteButton">Submit</button>
        </form>

        {clickedLogin? <p>Login failed</p>  : null}



                <br/><br/><br/><br/><br/>

    <section >
        {user === null? 
            <Expand description="Account Creation">
        <form  onSubmit={handleNewUserSubmit}>
        <label  htmlFor="postUserUsername"> Username: </label>

        <input className="postUser"  id="postUserUsername" value={newUser.username} onChange={((e)=>{
        setNewUser({...newUser, username:e.target.value})
        })} required ></input>


        <label id="labelForArticleBody"  htmlFor="postUserName">Full Name: </label>  
        <input className="postUser"  id="postUserName"  value={newUser.name} onChange={((e)=>{
        setNewUser({  ...newUser, name:e.target.value})
        })} required></input>

        <label id="postUIserAvatar"  htmlFor="postUserAvatar">Avatar URL: </label>  
        <input className="postUser"   id="postUserAvatar" value={newUser.avatar_url} onChange={((e)=>{
        setNewUser({  ...newUser,  avatar_url:e.target.value})
        })} required ></input>

        
        <button id="deleteButton">Create Account</button>
        </form>
        </Expand>
            :null}
    </section>
        {user===null? null:<button onClick={()=>{
            setUser(null)
            localStorage.setItem("user", null)
        }}>Logout</button>}

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