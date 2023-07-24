import { useEffect, useState, useContext } from "react"
import { getTopics } from "../../api"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext";



const TopicList = ()=>{
const [isLoading, setIsLoading] =useState(true)
const {user, setUser} = useContext(UserContext)
const [topics, setTopics] = useState([])
const[error, setError] = useState(false)

useEffect(()=>{
    setIsLoading(true)
    setError(true)

    getTopics()
    .then((res)=>{
        setTopics(res.allTopics)
        setIsLoading(false)
        setError(false)

    })
    .catch(err =>{
        setApiError(err)
        setIsLoading(false)
        setError(true)

    })
    
},[])

useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);



if(isLoading) {return <h1>Loading now...</h1>}
if(error){return <h1>Something went wrong try again later 🙄</h1>}

    return(
        <main>
                    <h3 className="userProfile">Topics</h3>
            <ul>
            {topics.map((topic)=>{
                return( <Link to={`/topics/${topic.slug}`} key={topic.slug} >
                <li className="topicLink" >{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}</li> </Link>)
            })}
            </ul>
        </main>
    )
}

export default TopicList