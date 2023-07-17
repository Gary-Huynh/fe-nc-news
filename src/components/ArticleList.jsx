import { useEffect, useState } from "react"
import { getArticles } from "../../api"
import SingleArticle from "./SingleArticle"

const ArticleList = ()=>{
const [articles, setArticles] = useState([])
    useEffect(()=>{

        getArticles()
        .then((res)=>{
            setArticles(res)
        })



    },[])



    return (
    
    <div>
        <h3 className="articleList">Article List here</h3>
        {articles.map((article)=>{

            return  <SingleArticle key={article.article_id}  article={article}/>
        })
        }

    </div>
    
    
    
    )
   }
   
   
   export default ArticleList