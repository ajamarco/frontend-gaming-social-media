import React, {useState} from 'react'


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

export default function Login({handleSignin}) {
    const URL = "http://localhost:3001/sign-in"
    const [value, setValue] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post_to_url(URL, value)
          .then(data => {
            if (data.token) handleSignin(data);
            else console.log('nope');
          });
    }

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

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
