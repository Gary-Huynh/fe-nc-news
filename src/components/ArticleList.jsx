import { useEffect, useState } from "react"
import { getArticles, getArticlesByComments, getArticlesByDate, getArticlesByVotes } from "../../api"
import SingleArticle from "./SingleArticle"

const ArticleList = ()=>{
const [articles, setArticles] = useState([])
const [isLoading, setIsLoading] = useState(true)
const[error, setError] = useState(false)
const [order, setOrder] = useState("desc")



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

    const handleClick = (e)=>{

        if(e.target.textContent === "Sort by comments") 
        {getArticlesByComments(order)
            .then((res)=>{
                setArticles(res.articles)})
        }
        else if(e.target.textContent === "Sort by likes")
         {getArticlesByVotes(order)
            .then((res)=>{
                setArticles(res.articles)})
        }
        else {getArticlesByDate(order)
            .then((res)=>{
                setArticles(res.articles)})
        }
        if(order === "asc") {setOrder("desc")}
            else {setOrder("asc")}
    }




    if(isLoading) {return <h1>Loading now...</h1>}
    if(error){return <h1>Something went wrong try again later 🙄</h1>}


    return (
    
    <div>
        <h3 className="articleList">Article List here</h3>
        <h3>
            <button onClick={(e)=>{
                            handleClick(e)
                        }}>Sort by comments</button>
        </h3>
        <h3>
            <button onClick={(e)=>{
                            handleClick(e)
                        }}>Sort by date created</button>
        </h3>
        <h3>
            <button onClick={(e)=>{
                            handleClick(e)
                        }}>Sort by likes</button>
        </h3>
            {(order==="asc") ? <p>Descending Order</p> : <p>Ascending Order</p>}
      
        {articles.map((article)=>{

            return  <SingleArticle key={article.article_id}  article={article}/>
        })
        }

    </div>
    
    
    
    )
   }
   
   
   export default ArticleList