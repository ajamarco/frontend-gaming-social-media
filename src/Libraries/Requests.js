const baseURI = "http://localhost:3001"
const signInURL = `${baseURI}/sign-in`
const validateURL = `${baseURI}/validate`

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

const signIn = (body) => postRequest(signInURL, body).then(response => response.json());

const validate = (token) => get(validateURL, token).then(response => response.json())

export default {signIn, validate}