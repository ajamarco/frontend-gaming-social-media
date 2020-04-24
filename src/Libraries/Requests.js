const baseURI = "http://localhost:3001"
const signInURL = `${baseURI}/sign-in`
const validateURL = `${baseURI}/validate`

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

export default {signIn}