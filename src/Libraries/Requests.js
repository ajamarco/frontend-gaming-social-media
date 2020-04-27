const baseURI = "http://localhost:3001"
const signInURL = `${baseURI}/sign-in`
const signUpURL = `${baseURI}/users`
const validateURL = `${baseURI}/validate`
const getPostsURL = `${baseURI}/posts`

const get = (url, token) => {
  return fetch(url,{
    headers: {
      "Authorization": token
    }
  })
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
  debugger;
  url = `${url}/${body.user_id}`
  return fetch(url, configurationOject)
}

const signIn = (body) => postRequest(signInURL, body).then(response => response.json());

const validate = (token) => get(validateURL, token).then(response => response.json())

const fetchPosts = () => get(getPostsURL, "").then(response => response.json()) 

const signUp = (body) => postRequest(signUpURL, body).then(response => response.json());

const updateUser = (body) => patchUser(signUpURL, body).then(response => response.json());

export default {signIn, validate, fetchPosts, signUp, updateUser }