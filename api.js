import axios from "axios";

const newsApi =  axios.create({
    baseURL: `https://nc-news-8ykn.onrender.com/api`
});

export const getArticles = ()=>{
    return newsApi.get("/articles").then((res)=>{
        return res.data.articles;
    })
}

export const getArticle = (article_id)=>{
    return newsApi.get(`articles/${article_id.article_id}`).then((res)=>{
        return res.data
    })
}

export const getComments = ({article_id})=>{

    return newsApi.get(`articles/${article_id}/comments`).then((res)=>{
        return res.data
    })
}

export const patchArticle= ({article_id})=>{
    const patchArticleBody = {
        inc_votes: 1
    }
    return newsApi.patch(`articles/${article_id}`,patchArticleBody).then((res)=>{
        return res.data
    })
}
