import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticles } from "../../api";
import SingleArticle from "./SingleArticle";




const Topic = ()=>{
const topic = useParams();
const [isLoading, setIsLoading] =useState(true)
const [articles, setArticles] =useState([])
const[error, setError] = useState(false)

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
    
if(isLoading) {return <h1>Loading now...</h1>}
if(error){return <h1>Something went wrong try again later 🙄</h1>}

return (
    <section>

        {articles.map((article)=>{
            if(article.topic===topic.topic_name){
                return <SingleArticle key={article.article_id} article={article}/>
            }
        })}
    </section>

)





}

export default Topic
