import { useEffect, useState, useContext } from "react"
import { getArticles, getArticlesSorted, postArticle } from "../../api"
import SingleArticle from "./SingleArticle"
import { UserContext } from "../contexts/UserContext";
import Expand from "./Expand";

const ArticleList = ()=>{
const {user,} = useContext(UserContext)
const [articles, setArticles] = useState([])
const [isLoading, setIsLoading] = useState(true)
const[error, setError] = useState(false)
const [order, setOrder] = useState("desc")


const [newArticle, setNewArticle] = useState({
    author: user,
    title:"",
    body:"",
    topic:"coding"
})



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
        let sortBy = ""
        if(e.target.textContent === "Sort by comments") sortBy="comment_count"
        else if(e.target.textContent === "Sort by likes") sortBy = "votes"
        else sortBy = "created_at"
        getArticlesSorted(sortBy,order)
            .then((res)=>{
                setArticles(res.articles)})
        if(order === "asc") {setOrder("desc")}
            else {setOrder("asc")}
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        postArticle(newArticle)
        .then((res)=>{
            setArticles((currArticles)=>{

                return [res.newArticle, ...currArticles]
            })

        })
        .catch(err =>{
            return alert("could not post article")
        })
        setNewArticle({
            author: user,
            title:"",
            body:"",
            topic:"coding"
        })
    }


    if(isLoading) {return <h1>Loading now...</h1>}
    if(error){return <h1>Something went wrong try again later 🙄</h1>}


    return (
    
    <div>
        <h3 className="userProfile">Articles</h3>
        <section className="buttonGroup">
        <h3>
            <button className="button" onClick={(e)=>{
                            handleClick(e)
                        }}>Sort by comments</button>
        </h3>
        <h3>
            <button className="button" onClick={(e)=>{
                            handleClick(e)
                        }}>Sort by date created</button>
        </h3>
        <h3>
            <button className="button" onClick={(e)=>{
                            handleClick(e)
                        }}>Sort by likes</button>
        </h3>
        </section  >

            {(order==="asc") ? <p className="order">Descending Order</p> : <p className="order">Ascending Order</p>}
            
            <Expand description="article posting">
            <section >
            <form  onSubmit={handleSubmit}>
            <label  htmlFor="postArticleTitle"> Article Title</label>

            <input className="postArticleForm" id="postArticleTitle" value={newArticle.title} onChange={((e)=>{
            setNewArticle((currBody)=>{
                return {...currBody, title:e.target.value}
                })
            })} required ></input>

            <label  htmlFor="postArticleTopic"> Article Topic</label>
            <select className="postArticleForm"  id="postArticleTopic"  value={newArticle.topic} onChange={((e)=>{
            setNewArticle((currBody)=>{
                return {...currBody, topic:e.target.value}
                })
            })} required>
                <option className="selectOption" value="coding"> Coding </option>
                <option className="selectOption" value="football"> Football </option>
                <option className="selectOption" value="cooking"> Cooking </option>
                <option className="selectOption" value="singing"> Singing </option>
            </select>


            <label id="labelForArticleBody"  htmlFor="postArticleBody">Article Content</label>  
            <textarea id="postArticleBody"  value={newArticle.body} onChange={((e)=>{
            setNewArticle((currBody)=>{
                return {...currBody, body:e.target.value}
                })
            })} required></textarea>
    

            <button id="deleteButton">Post Article</button>
        </form>

        </section>
        
        </Expand>
        
        
        <div className="articleGrid">
        {articles.map((article)=>{

            return  <SingleArticle key={article.title}  article={article}/>
        })
        }
        </div>
    </div>
    
    
    
    )
   }
   
   
   export default ArticleList