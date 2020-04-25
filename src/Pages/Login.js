import React, { useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';

//icon
import appIcon from '../Images/app_icon.png'

//MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        marginTop: 20
    }
    
}

function Login({classes}) {
    const [value, setValue] = useState({
        email: '',
        password: '',
        login: false,
        errors: {}
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('inside submiting', e.target)
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
                    Login
                </Typography>
                <form noValidate onSubmit={(e) => handleSubmit(e)}>
                    <TextField id="email" name="email" type="email" label="email" className={classes.textField} value={value.email} onChange={(e) => handleChange(e)} fullWidth/>
                    <TextField id="password" name="password" type="password" label="password" className={classes.textField} value={value.password} onChange={(e) => handleChange(e)} fullWidth/>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Login
                    </Button>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)
