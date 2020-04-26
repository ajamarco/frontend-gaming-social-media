import React, { useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//icon
import appIcon from '../Images/app_icon.png'

//MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//request library
import Requests from '../Libraries/Requests'

//TODO move styles to file inside /helpers. 
const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: "20px auto 10px auto"
    },
    pageTitle:{
        margin: "10px auto 10px auto"
    },
    textField:{
        margin: "10px auto 10px auto"
    },
    button:{
        margin: "20px auto 10px auto",
        position: 'relative'
    },
    customError:{
        color: 'red',
        fontSize:'0.8rem',
        marginTop: 10
    },
    progress:{
        position: 'absolute'
    }
    
}

function SignUp({classes, history}) {
    const [value, setValue] = useState({
        email: '',
        password: '',
        confirmPassword:'',
        login: false,
        errors: {}
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        //setting the loading to true
        setValue({
            ...value, 
            loading:true
        })

        const newUserData = {
            user:{
                email: value.email, 
                password: value.password, 
                password_confirmation: value.confirmPassword
            }
        };
        Requests.signUp(newUserData)
          .then(res => {
              setValue({
                ...value, 
                loading: false      
              })
              if (res.token){
                localStorage.token = res.token;
                history.push('/');
              }
              else alert('nope');
          })

        
        // Requests.signUp(newUserData)
        //   .then(data => {
        //       setValue({
        //           ...value,
        //           loading:false
        //       });
        //       if (data.token){
        //         localStorage.token = data.token;
        //         history.push('/');
        //       }
        //       else alert('nope');
        //   })
        //   .catch(err => {
        //       setValue({
        //           ...value,
        //           errors: err.response.data,
        //           loading: false
        //       })
        //   });
    }
    
    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <img src={appIcon} alt="logo" className={classes.image}/>
                <Typography variant="h2" className={classes.pageTitle}>
                    Signup
                </Typography>
                <form noValidate onSubmit={(e) => handleSubmit(e)}>
                    <TextField 
                      id="email" 
                      name="email" 
                      type="email" 
                      label="email" 
                      className={classes.textField} 
                      value={value.email} 
                      onChange={(e) => handleChange(e)} 
                      helperText={value.errors.email}
                      error={value.errors.email ? true : false}
                      fullWidth/>
                    <TextField 
                      id="password" 
                      name="password" 
                      type="password" 
                      label="Password" 
                      className={classes.textField} 
                      value={value.password} 
                      helperText={value.errors.password}
                      error={value.errors.password ? true : false}
                      onChange={(e) => handleChange(e)} 
                      fullWidth/>
                      <TextField 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      label="confirm Password" 
                      className={classes.textField} 
                      value={value.confirmPassword} 
                      helperText={value.errors.confirmPassword}
                      error={value.errors.confirmPassword ? true : false}
                      onChange={(e) => handleChange(e)} 
                      fullWidth/>
                      {value.errors.general && (
                          <Typography variant="body2" className={classes.customError}>
                              {value.errors.general}
                          </Typography>
                      )}
                    <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={value.loading}>
                        Signup
                        {value.loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                    </Button>
                    <br/>
                    <small>Already have an account? <Link to='/login'>Login</Link></small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignUp)
