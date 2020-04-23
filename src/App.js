import React,{useState, useEffect} from 'react';
import './App.css';
import Login from './Components/Login/Login'

function App() {
  const [token,setToken] = useState(null);
  console.log('token is ', token);
  const handleSignin = (data) => {
    localStorage.token = data.token;
  }

  return (
    <div className="App">
      <h2>Hello {token === null ? "stranger" : "old friend"}</h2>
      <Login handleSignin={handleSignin}/>
    </div>
  );
}

export default App;
