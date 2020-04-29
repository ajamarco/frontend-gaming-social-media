const baseURI = "http://localhost:3001"
const signInURL = `${baseURI}/sign-in`
const signUpURL = `${baseURI}/users`
const validateURL = `${baseURI}/validate`
const getPostsURL = `${baseURI}/posts`
const unlikeURL = `${baseURI}/unlike_post`
const likeURL = `${baseURI}/likes`

const get = (url, token) => {
  return fetch(url,{
    headers: {
      "Authorization": token
    }
  })
}

const deleteLike = (url, body) => {
  const configurationOject = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  return fetch(url, configurationOject);
}

const deletePostById = (url, id) => {
  url = `${url}/${id}`;
  const configurationOject = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }}
  return fetch(url, configurationOject);
}

const postRequest = (url, body) =>{
  const configurationOject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body) 
  }
  return fetch(url, configurationOject)
}

const patchUser = (url, body) => {
  const configurationOject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  }
  url = `${url}/${body.user_id}`
  return fetch(url, configurationOject)
}

const getSinglePost = (url, id) => {
  url = `${url}/${id}`;
  return fetch(url);
}

const signIn = (body) => postRequest(signInURL, body).then(response => response.json());

const validate = (token) => get(validateURL, token).then(response => response.json())

const fetchPosts = () => get(getPostsURL, "").then(response => response.json()) 

const signUp = (body) => postRequest(signUpURL, body).then(response => response.json());

const updateUser = (body) => patchUser(signUpURL, body).then(response => response.json());

const deletePost = (postId) => deletePostById(getPostsURL, postId).then(response => response.json());

const unlikePost = (body) => deleteLike(unlikeURL, body).then(response => response.json());

const likePost = (body) => postRequest(likeURL, body).then(response => response.json());

const addPost = (body) => postRequest(getPostsURL,body).then(response => response.json());

const getPost = (postId) => getSinglePost(getPostsURL, postId).then(response => response.json());

export default {signIn, validate, fetchPosts, signUp, updateUser, deletePost, unlikePost, likePost, addPost, getPost }