import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticles } from "../../api";
import SingleArticle from "./SingleArticle";




const Topic = ()=>{
const topic = useParams();
const [isLoading, setIsLoading] =useState(true)
const [articles, setArticles] =useState([])

    useEffect(()=>{
        setIsLoading(true)
        getArticles()
        .then((res)=>{

            setArticles(res)
            setIsLoading(false)

        })
    },[])
    
if(isLoading) {return <h1>Loading now...</h1>}
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
