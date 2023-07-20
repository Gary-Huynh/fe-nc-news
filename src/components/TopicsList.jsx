import { useEffect, useState } from "react"
import { getTopics } from "../../api"
import { Link } from "react-router-dom"




const TopicList = ()=>{
const [isLoading, setIsLoading] =useState(true)
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