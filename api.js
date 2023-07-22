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

export const postComment = ({article_id},body) =>{

    const postCommentBody = {
        username: body.username,
        body:body.body,
    }

    return newsApi.post(`/articles/${article_id}/comments`,postCommentBody).then((res)=>{

        return res
    })
}


export const patchArticle= ({article_id},upOrDown)=>{

    const patchArticleBody = {
        inc_votes: upOrDown
    }
    return newsApi.patch(`articles/${article_id}`,patchArticleBody).then((res)=>{
        return res.data
    })
}

export const getTopics = ()=>{
    return newsApi.get("/topics").then((res)=>{

        return res.data
    })
}


export const deleteComment = (comment_id)=>{

    return newsApi.delete(`/comments/${comment_id}`).then((res)=>{

        return res
    })


}

export const getUsers = ()=>{
    return newsApi.get("/users").then((res)=>{
            return res.data
    })
}
export const getArticlesSorted = (sort_by,order)=>{
    return newsApi.get(`/articles?sort_by=${sort_by}&order=${order}`).then((res)=>{

        return res.data
    })
}

export const getArticlesLatestFive = ()=>{
    return newsApi.get("/articles?order_by=date&limit=6").then((res)=>{
        return res.data
    })
}

export const postArticle = (article) =>{

    const articlePostBody = {
        author:article.author,
        body:article.body,
        topic:article.topic,
        title:article.title
    }
    console.log(articlePostBody)
    return newsApi.post(`/articles`,articlePostBody).then((res)=>{
        return res.data
    })
}

export const deleteArticle = (article_id)=>{

    return newsApi.delete(`/articles/${article_id}`).then((res)=>{

        return res
    })


}

export const postUser = (newUser)=>{
    console.log(newUser, "newUser here")
    const newUserBody = {
        username: newUser.username,
        name: newUser.name,
        avatar_url: newUser.avatar_url
    }
    return newsApi.post("/users", newUserBody).then((res)=>{
        console.log(res)
        return res.data
    })
}