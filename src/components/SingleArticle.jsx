import {Link} from "react-router-dom"

const SingleArticle = ({article})=>{

    return (

        <div className="singleArticle">
            <img className="singleArticleImage" src={article.article_img_url}/>
            <Link to={`/articles/${article.article_id}`}>
            <h2 >{article.title}</h2>
            </Link>

            <p className="singleArticleP">Author: {article.author}</p>
            <div className="commentsAndLikes">
            <p className="singleArticleP">💬 {article.comment_count}</p>
            <p className="singleArticleP">❤ {article.votes}</p>
            </div>
            <p className="singleArticleP">Created at: {article.created_at}</p>
       

        </div>


    )
   }
   
   
   export default SingleArticle