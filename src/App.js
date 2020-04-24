import React,{useState, useEffect} from 'react';
import './App.css';
import Login from './Components/Login/Login'


function App() {
  const [email,setEmail] = useState(null);
  console.log('email is ', email);
  const handleSignin = (data) => {
    localStorage.token = data.token;
    setEmail(data.email);
  }

  useEffect(() => {
    //if we have a token stored, we will try make a get request to /validate
    if (localStorage.token){
      
    }
  }, [])

  return (
    <div className="App">
      <h2>Hello {email !== null ? email : "stranger"}</h2>
      <Login handleSignin={handleSignin}/>
    </div>
  );
}

export default App;
