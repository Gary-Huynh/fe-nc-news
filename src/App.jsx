import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Home from './components/Home'
import ArticleList from './components/ArticleList'
import Article from './components/Article'
import TopicList from './components/TopicsList'
import Topic from './components/Topics'
import UserList from './components/UserList'
import Error from './components/Error'

function App() {


  return (
    <div className="app">
      <Header />
      <Nav />
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path="/articles" element={<ArticleList />}/>
        <Route path = "/articles/:article_id" element={<Article />} />
        <Route path = "/topics" element={<TopicList/>} />
        <Route path="/topics/:topic_name" element={<Topic />}/>
        <Route path = "/users" element={<UserList />} />
        <Route path = "/*" element={<Error errorStatus={404} errorMessage={"Not Found"} />} />







      </Routes>
    </div>
  )}
export default App
