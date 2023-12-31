import { useContext, useState, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"
import { getArticlesLatestFive } from "../../api"
import SingleArticle from "./SingleArticle"




const Home = ()=>{
const [articles, setArticles] = useState([])
const {user, setUser} = useContext(UserContext)
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

useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

if(isLoading) {return <h1>Loading now...</h1>}
if(error){return <h1>Something went wrong try again later 🙄</h1>}



    return    (     
    <main>
        <h3 className="userProfile">Home</h3>
        <h3 className="order"> Breaking News</h3>
    
        <div className="articleGrid">
    {articles.map((article)=>{

        return  <SingleArticle key={article.article_id}  article={article}/>
        })
        }
        </div>
    </main>
    )
   }
   
   
   export default Home