import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticles,getArticlesSorted, getTopics } from "../../api"
import SingleArticle from "./SingleArticle";
import TopicList from "./TopicsList";




const Topic = ()=>{
const topic = useParams();


const [isLoading, setIsLoading] =useState(true)
const [articles, setArticles] =useState([])
const[error, setError] = useState(false)
const [order, setOrder] = useState("desc")
const [topics, setTopics] = useState([])
const [apiError, setApiError] = useState(false)


    useEffect(()=>{
        setIsLoading(true)
        setError(true)


        getArticles()

        .then((res)=>{

            setArticles(res)
            setIsLoading(false)
            setError(false)
        })
        .catch(err =>{

            setIsLoading(false)
            setError(true)
    
        })
    },[])

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

            setIsLoading(false)
            setError(true)
    
        })
    },[])


    const handleClick = (e)=>{
        let sortBy = ""
        if(e.target.textContent === "Sort by comments") sortBy="comment_count"
        else if(e.target.textContent === "Sort by likes") sortBy = "votes"
        else sortBy = "created_at"
        getArticlesSorted(sortBy,order)
            .then((res)=>{
                setArticles(res.articles)})
        if(order === "asc") {setOrder("desc")}
            else {setOrder("asc")}
    }

const justTopicName = topics.map((topic)=>{
    return topic.slug
})

if(apiError){return <h1>Topic does not exist!</h1>}
if(isLoading) {return <h1>Loading now...</h1>}
if(error){return <h1>Something went wrong try again later 🙄</h1>}

return (
    
    <section>
        <h3 className="userProfile">{topic.topic_name.charAt(0).toUpperCase() + topic.topic_name.slice(1)} Articles</h3>
        <section className="buttonGroup">
        <h3>
            <button className="button" onClick={(e)=>{
                            handleClick(e)
                        }}>Sort by comments</button>
        </h3>
        <h3>
            <button className="button" onClick={(e)=>{
                            handleClick(e)
                        }}>Sort by date created</button>
        </h3>
        <h3>
            <button className="button" onClick={(e)=>{
                            handleClick(e)
                        }}>Sort by likes</button>
        </h3>
        </section>

            {(order==="asc") ? <p className="order">Descending Order</p> : <p className="order">Ascending Order</p>}







        {justTopicName.includes(topic.topic_name)===false ? <h1>Topic Does Not Exist!</h1>:null}
        <div className="articleGrid">
        {articles.map((article)=>{

            return  <SingleArticle key={article.article_id}  article={article}/>
        })
        }
        </div>
    </section>

)





}

export default Topic
