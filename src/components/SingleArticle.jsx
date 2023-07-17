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
            <p>Votes :{article.votes}</p>

        </div>


    )
   }
   
   
   export default SingleArticle