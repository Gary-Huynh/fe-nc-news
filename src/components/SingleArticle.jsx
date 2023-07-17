const SingleArticle = ({article})=>{

    return (
        <div className="singleArticle">
            <h2>{article.title}</h2>
            <p>Topic: {article.topic}</p>
            <p>Author: {article.author}</p>
            <p>Comments: {article.comment_count}</p>
            <p>Votes :{article.votes}</p>
        </div>


    )
   }
   
   
   export default SingleArticle