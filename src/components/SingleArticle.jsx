import {Link} from "react-router-dom"

const SingleArticle = ({article})=>{

    return (

        <div className="singleArticle">
            <Link to={`/articles/${article.article_id}`}>
            <h2 >{article.title}</h2>
            </Link>
            <p>Topic: {article.topic}</p>
            <p>Author: {article.author}</p>
            <p>Comments: {article.comment_count}</p>
            <p>Likes: {article.votes}</p>
            <p>Created at: {article.created_at}</p>

        </div>


    )
   }
   
   
   export default SingleArticle