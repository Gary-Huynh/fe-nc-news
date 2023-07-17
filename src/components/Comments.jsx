import { getComments } from "../../api"
import { useEffect, useState } from "react";
const Comments = ({article_id})=>{
    const [isLoading, setIsLoading] = useState(true)
    const[comments, setComments] = useState([])
    const[error, setError] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        setError(true)
    
        getComments(article_id).then((res)=>{

            setComments(res.comments)
            setIsLoading(false)
            setError(false)
        })
        .catch(err=>{
            setIsLoading(false)
            setError(true)
        })
    },[])
    if(comments.length === 0){return <h3>no comments ☹</h3>}
    if(isLoading) {return <h1>Loading now...</h1>}
    if(error){return <h1>Something went wrong try again later 🙄</h1>}
return(
    <section>
    {comments.map((comment)=>{
        return( 
        <li className="singleComment" key={comment.comment_id}>
            <p>{comment.body}</p>
            <p>Posted by {comment.author}</p>
            <p>Votes: {comment.votes}</p>
            <p>Posted at: {comment.created_at}</p>
        </li>)
    })}
    </section>
)


}
export default Comments