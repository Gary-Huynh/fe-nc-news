import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Home from './components/Home'
import ArticleList from './components/ArticleList'
import Article from './components/Article'

function App() {
  const [articles, setArticles] = useState([])

  return (
    <div className="app">
      <Header />
      <Nav />
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path="/articles" element={<ArticleList articles={articles} setArticles={setArticles}/>}/>
        <Route path = "/articles/:article_id" element={<Article />} />








      </Routes>
    </div>
  )}
export default App
