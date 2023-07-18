import { useEffect, useState } from "react"
import { getArticles } from "../../api"
import SingleArticle from "./SingleArticle"

const ArticleList = ()=>{
    const [articles, setArticles] = useState([])
const [isLoading, setIsLoading] = useState(true)
const[error, setError] = useState(false)



    useEffect(()=>{
        setIsLoading(true)
        setError(true)

        getArticles()
        .then((res)=>{
            setArticles(res)
            setIsLoading(false)
            setError(false)
        })
        .catch(err =>{
            setIsLoading(false)
            setError(true)

        })



    },[])

    if(isLoading) {return <h1>Loading now...</h1>}
    if(error){return <h1>Something went wrong try again later 🙄</h1>}


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