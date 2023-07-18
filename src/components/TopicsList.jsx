import { useEffect, useState } from "react"
import { getTopics } from "../../api"
import { Link } from "react-router-dom"




const TopicList = ()=>{
const [isLoading, setIsLoading] =useState(true)
const [topics, setTopics] = useState([])
useEffect(()=>{
    setIsLoading(true)
    getTopics()
    .then((res)=>{
        setTopics(res.allTopics)
        setIsLoading(false)

    })
    
},[])

if(isLoading) {return <h1>Loading now...</h1>}

    return(
        <main>

            {topics.map((topic)=>{
                return( <Link to={`/topics/${topic.slug}`} key={topic.slug}>
                <h2 >{topic.slug}</h2> </Link>)
            })}
        </main>
    )
}

export default TopicList