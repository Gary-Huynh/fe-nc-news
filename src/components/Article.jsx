import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"
import { deleteArticle, getArticle, patchArticle } from "../../api";
import Comments from "./Comments";
import { UserContext } from "../contexts/UserContext";

const Article = () =>{


const [article, setArticle] = useState();
const article_id = useParams();
const [isLoading, setIsLoading] = useState(true);
const[error, setError] = useState(false);
const [userVotes, setUserVotes] =useState(0);
const [voteError, setVoteError] = useState(false);
const [apiError, setApiError] = useState(null);
const {user} = useContext(UserContext)
const [deleted, setDeleted] = useState(false)

useEffect(()=>{
    setIsLoading(true)
    setError(true)

    getArticle(article_id).then((res)=>{

        setArticle(res.article)
        setIsLoading(false)
        setError(false)
    })
    .catch(err=>{
        setApiError(err)
        setIsLoading(false)
        setError(true)

    })
},[])
const handleClick = (e)=>{
    let upOrDown = 0
    setVoteError(false)
    setUserVotes((currentVotes)=>{
        if(e.target.innerText === "👍") 
            {upOrDown = 1
            return currentVotes + 1}
        else {
            upOrDown = -1
            return currentVotes - 1;}
    })
        patchArticle(article_id, upOrDown)
            .catch((err)=>{
                setUserVotes((currentVotes)=>{
                    if(e.target.innerText === "👍") return currentVotes - 1;
                    else{return currentVotes + 1};
                })
                setVoteError(true)
            })
}

const handleDeleteClick = ()=>{

    deleteArticle(article.article_id)
    .then((res)=>{
        setDeleted(true)
    })

    .catch(err=>{
        setError(true)
    })  
}


if(apiError){
    return(
        <main>
            <h1>{apiError.response.status}</h1>
            <h1>{apiError.response.data.msg}</h1>
        </main>
    )
}

if(isLoading) {return <h1>Loading now...</h1>}
if(error){return <h1>Something went wrong try again later 🙄</h1>}
    return(
        <article>



        <h2 id="articleTitle">{article.title}</h2>
        <img className="articleImage"  src={article.article_img_url} alt="image describing the article"/>
        <h3> Topic: {article.topic}</h3>
        <h3> Author: {article.author}</h3>
        <p id="articleBody">{article.body}</p>
        <p>created at: {article.created_at}</p>
        <p className="emoji">❤ {userVotes + article.votes  }</p>

        <section className="buttonGroup">

        <button onClick={handleClick} disabled={userVotes !==0 || user===null}>👍</button>
        <button onClick={handleClick} disabled={userVotes !==0 || user===null}>👎</button>
        
        </section>

        {voteError? <p>Error please try again later</p> : null}


        <button onClick={(e)=>{handleDeleteClick(article.article_id)}} disabled={user !== article.author}>Delete Article</button>
        {deleted? <h2>Article deleted</h2>:null}
        <br/> <br/> <br/> <br/>



        <h3 id="articleComments">Comments</h3>
        <p  id="countComments">Current Comments:  {article.comment_count}</p>
        <section>{<Comments article_id={article_id} />}</section>
        </article>
    )
}

export default Article
