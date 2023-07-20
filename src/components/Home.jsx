import { useContext, useState, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"
import { getArticlesLatestFive } from "../../api"
import SingleArticle from "./SingleArticle"




const Home = ()=>{
const [articles, setArticles] = useState([])
const {user} = useContext(UserContext)
const [isLoading, setIsLoading] = useState(true)
const[error, setError] = useState(false)


useEffect(()=>{
    setIsLoading(true)
    setError(true)

    getArticlesLatestFive()
    .then((res)=>{
        setArticles(res.articles)
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



    return    (     
    <main>
    {articles.map((article)=>{

        return  <SingleArticle key={article.article_id}  article={article}/>
        })
        }
    </main>
    )
   }
   
   
   export default Home