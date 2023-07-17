import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticle } from "../../api";


const Article = () =>{
const [article, setArticle] = useState()
const article_id = useParams();
const [isLoading, setIsLoading] = useState(true)

useEffect(()=>{
    setIsLoading(true)

    getArticle(article_id).then((res)=>{

        setArticle(res.article)
        setIsLoading(false)
    })
},[])

if(isLoading) {return <h1>Loading now...</h1>}
    return(
        <div>

        <h2>{article.title}</h2>
        <img width="600px" src={article.article_img_url} alt="image describing the article"/>
        <h3> Topic: {article.topic}</h3>
        <h3> Author: {article.author}</h3>
        <p>{article.body}</p>
        <p>created at: {article.created_at}</p>
        <p>Votes: {article.votes}</p>
        <p>Comment Count:  {article.comment_count}</p>

        </div>
    )
}

export default Article