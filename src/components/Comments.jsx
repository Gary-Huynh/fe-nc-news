import { deleteComment, getComments } from "../../api"
import { useEffect, useState, useContext } from "react";
import { postComment } from "../../api";
import { UserContext } from "../contexts/UserContext";
const Comments = ({article_id})=>{
    const {user} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true)
    const[comments, setComments] = useState([])
    const[error, setError] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [newComment, setNewComment] = useState({username:`${user}`, body: ""})
    const [deleted, setDeleted] =useState(false)
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
    },[submit,deleted])
const handleSubmit = (e)=>{
        e.preventDefault()

        postComment(article_id, newComment).then((returnedComment)=>{
                return returnedComment
        })
        .then((newComment)=>{
            setComments((currComments)=>{
                return [newComment.data.comment,...currComments]
            })

            setNewComment({username:`${user}`, body:""})
        
            setSubmit(true)
        })
    }


const handleClick = (comment)=>{
    setDeleted(false)
    deleteComment(comment.comment_id).then(()=>{
        setDeleted(true)
            alert ("Comment Deleted")
    })

}

    if(isLoading) {return <h1>Loading now...</h1>}
    if(comments.length === 0){return <h3>no comments ☹</h3>}
    if(error){return <h1>Something went wrong try again later 🙄</h1>}

return(
    <section>

        <form onSubmit={handleSubmit}>
        <label htmlFor="postComment">Write your new comment here!  </label>
        <textarea id="postComment" type="text" value={newComment.body}
        onChange={((e)=>{
            setNewComment((currBody)=>{
                return {...currBody, body:e.target.value}
            })
        })} required/>
        <button disabled={submit===true}>Post Comment!</button >
        {submit? <p>message posted!</p>:null}
        </form>

    {comments.map((comment)=>{
        return( 
        <section className="singleComment" key={comment.comment_id}>
            <p>{comment.body}</p>
            <p>Posted by {comment.author}</p>
            <p>Votes: {comment.votes}</p>
            <p>Posted at: {comment.created_at}</p>
            <button disabled={comment.author !== user} onClick={(e)=>{
                handleClick(comment)


            }} comment={comment}> Delete Comment</button>
        </section>)

    })}
    </section>
)


}
export default Comments