import { deleteComment, getComments } from "../../api"
import { useEffect, useState, useContext } from "react";
import { postComment } from "../../api";
import { UserContext } from "../contexts/UserContext";
import Expand from "./Expand";
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
            setError(false)
            if (err.response.status !== 404){
            setError(true)}
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
        setComments((currComments)=>{
            return (currComments.filter(singleComment=>{
                if(singleComment.comment_id !== comment.comment_id) {
                    return singleComment
                }
            }))
        })

    deleteComment(comment.comment_id).then(()=>{


            alert ("Comment Deleted")
    })
    .catch(err =>{
        alert("Could not Delete try again later")

            setComments((currComments=>{
                return [comment, ...currComments]
            }))
        
    })

}

    if(isLoading) {return <h1>Loading now...</h1>}
    if(error){return <h1>Something went wrong try again later 🙄</h1>}

return(
    <section>

        <form onSubmit={handleSubmit}>
        <div className="commentBox">
        <label id="commentLabel" htmlFor="postComment">Have some thoughts? </label>
        <textarea  placeholder="Type here..."  id="postComment" type="text" value={newComment.body}
        onChange={((e)=>{
            setNewComment((currBody)=>{
                return {...currBody, body:e.target.value}
            })
        })} required/>
                </div>
        <button id="postButton"  disabled={submit===true}>Post Comment!</button >
        {submit? <p>message posted!</p>:null}
        </form>
        <Expand description={"comments"}>
        {comments.length===0 ? <h3>no comments ☹</h3>:comments.map((comment)=>{
            return( 
            <section className="singleComment" key={comment.comment_id}>
                <p id="commentBody">{comment.body}</p>
                <p className="commentAttributes">Posted by {comment.author}</p>
                <p className="commentAttributes">❤ {comment.votes}</p>
                <p className="commentAttributes">Posted at: {comment.created_at}</p>
                <button id="deleteButton" disabled={comment.author !== user} onClick={(e)=>{
                    handleClick(comment)


                }} comment={comment}> Delete Comment</button>
            </section>)

            })}

        </Expand>
    </section>
)


}
export default Comments