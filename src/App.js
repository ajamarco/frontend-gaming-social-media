import React,{useState, useEffect} from 'react';
import './App.css';
// import Login from './Components/Login/Login'
import Requests from './Libraries/Requests'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from "./Components/Navbar"
import AuthRoute from './Helpers/AuthRoute'

//MUI
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

import themeObj from './Helpers/Theme'
//pages
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
//session stuff
import jwtDecode from 'jwt-decode'

const theme = createMuiTheme(themeObj);


const token = localStorage.token;
// used to decode the token if we need the user id
//if (token){
//   const decodeToken = jwtDecode(token);
//   console.log(decodeToken);
// }

function App() {
  return(
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <AuthRoute exact path="/login" component={Login} authenticated={token}/>
              <AuthRoute exact path="/signup" component={SignUp} authenticated={token}/>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App;

// this.setState({
//   username: null
// })
// localStorage.removeItem("token")

// const [email,setEmail] = useState(null);
// console.log('email is ', email);
// const handleSignin = (data) => {
//   localStorage.token = data.token;
//   setEmail(data.email);
// }

// useEffect(() => {
//   //if we have a token stored, we will try make a get request to /validate
//   if (localStorage.token){
//     Requests.validate(localStorage.token)
//       .then(data => {
//         setEmail(data.email);
//         localStorage.token = data.token;
//       })
//   }else console.log('noow');
// }, [localStorage.token])

// return (
//   <div className="App">
//     <h2>{email !== null ? `welcome ${email}` : "welcome stranger"}</h2>
//     <Login handleSignin={handleSignin}/>
//   </div>
// );
// }