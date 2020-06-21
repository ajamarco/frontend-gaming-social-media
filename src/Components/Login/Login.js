import React, {useState} from 'react'
import Requests from '../../Libraries/Requests'

//async function to send information using the POST method
async function post_to_url(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    return resData;
   
  }

//main function
export default function Login({handleSignin}) {
    const URL = "http://localhost:3001/sign-in"
    //initial state for the user is email and password blanks
    const [value, setValue] = useState({
        email: '',
        password: ''
    });

    //handle submit button
    const handleSubmit = (e) => {
        e.preventDefault();

        //we call the function signIn in the Request library
        Requests.signIn(value)
          .then(data => {
            //if the data contains the token we will redirect it to the handleSignin function
            //that came as a prop
            if (data.token) handleSignin(data);
            else console.log('Something went Wrong...');
          });
    }

    //default function to match the state with the textbox
    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    //show the login form
    return (
        <form onSubmit={e => handleSubmit(e)}>
            <label>Username:</label>
            <input type="email" name="email" onChange={(e) => handleChange(e)} value={value.email}/><br/>

            <label>Password:</label>
            <input type="password" name="password" onChange={(e) => handleChange(e)} value={value.password}/><br/>

            <input type="submit" value="Sign In"/>
      </form>
    )
}
