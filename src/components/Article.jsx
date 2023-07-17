import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticle, patchArticle } from "../../api";
import Comments from "./Comments";


const Article = () =>{
const [article, setArticle] = useState()
const article_id = useParams();
const [isLoading, setIsLoading] = useState(true)
const[error, setError] = useState(false)
const [userVotes, setUserVotes] =useState(0)
const [voteError, setVoteError] = useState(false)
useEffect(()=>{
    setIsLoading(true)
    setError(true)

    getArticle(article_id).then((res)=>{

        setArticle(res.article)
        setIsLoading(false)
        setError(false)
    })
    .catch(err=>{
        setIsLoading(false)
        setError(true)

    })
},[])
const handleClick = ()=>{
    setVoteError(false)
    setUserVotes((currentVotes)=>{
        return currentVotes + 1;
    })
        patchArticle(article_id)
            .catch((err)=>{
                setUserVotes((currentVotes)=>{
                    return currentVotes - 1
                })
                setVoteError(true)
            })
}

if(isLoading) {return <h1>Loading now...</h1>}
if(error){return <h1>Something went wrong try again later 🙄</h1>}
    return(
        <article>

        <h2>{article.title}</h2>
        <img width="600px" src={article.article_img_url} alt="image describing the article"/>
        <h3> Topic: {article.topic}</h3>
        <h3> Author: {article.author}</h3>
        <p>{article.body}</p>
        <p>created at: {article.created_at}</p>
        <p>Likes: {article.votes + userVotes}</p>
        <button onClick={handleClick} disabled={userVotes > 0}>🐉</button>
        {voteError? <p>Error please try again later</p> : null}
        <p>Comment Count:  {article.comment_count}</p>
        <br/> <br/> <br/> <br/>
        <h3>Comments</h3>

        <section>{<Comments article_id={article_id} />}</section>
        </article>
    )
}

export default Article