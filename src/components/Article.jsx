import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getArticle, patchArticle } from "../../api";
import Comments from "./Comments";
import { UserContext } from "../contexts/UserContext";

const Article = () =>{
const {user} = useContext(UserContext)

const [article, setArticle] = useState();
const article_id = useParams();
const [isLoading, setIsLoading] = useState(true);
const[error, setError] = useState(false);
const [userVotes, setUserVotes] =useState(0);
const [voteError, setVoteError] = useState(false);
const [apiError, setApiError] = useState(null);

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


if(apiError){
    return(
        <main>
            <p>{apiError.response.status}</p>
            <p>{apiError.response.data.msg}</p>
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

        <button onClick={handleClick} disabled={userVotes !==0}>👍</button>
        <button onClick={handleClick} disabled={userVotes !==0}>👎</button>
        
        </section>

        {voteError? <p>Error please try again later</p> : null}

        <br/> <br/> <br/> <br/>



        <h3 id="articleComments">Comments</h3>
        <p  id="countComments">Current Comments:  {article.comment_count}</p>
        <section>{<Comments article_id={article_id} />}</section>
        </article>
    )
}

export default Article
