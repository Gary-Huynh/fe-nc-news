import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticle, postComment } from "../../api";
import Comments from "./Comments";
import { UserContext } from "../contexts/UserContext";

const Article = () =>{
const {user} = useContext(UserContext)
const [newComment, setNewComment] = useState({username:`${user}`, body: ""})
const [article, setArticle] = useState()
const article_id = useParams();
const [isLoading, setIsLoading] = useState(true)
const[error, setError] = useState(false)
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
const handleSubmit = (e)=>{
    e.preventDefault()

    postComment(article_id, newComment).then((returnedComment)=>{
            return returnedComment
    })

    setNewComment({username:`${user}`, body:"Comment Posted!"})
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
        <p>Votes: {article.votes}</p>
        <p>Comment Count:  {article.comment_count}</p>
        <br/> <br/> <br/> <br/>
        <form onSubmit={handleSubmit}>
            <label htmlFor="postComment">Write your new comment here!  </label>
            <input id="postComment" type="text" value={newComment.body}
            onChange={((e)=>{
                setNewComment((currBody)=>{
                    return {...currBody, body:e.target.value}
                })
            })} required/>
            <button disabled={newComment.body==="Comment Posted!"}>Post Comment!</button >
        </form>


        <h3>Comments</h3>

        <section>{<Comments article_id={article_id} />}</section>
        </article>
    )
}

export default Article
