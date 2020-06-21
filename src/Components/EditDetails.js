import React, { Component, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../Helpers/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../Redux/Actions/userActions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Tooltip, IconButton } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';

//set the styles for this component
const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    float: 'right'
  }
});

//MAIN function
function EditDetails({classes, credentials, editUserDetails}) {
    //holds all the user info, as well if the dialog is opened or not
    const [info, setInfo] = useState({
        bio: '',
        website: '',
        location: '',
        img_url: '',
        open: false
    })

    //when info.open is moddified populate the info with the user information
    useEffect(() => {
        
        setInfo({
            ...info,
            bio: credentials.bio,
            img_url: credentials.img_url,
            website: credentials.website,
            location: credentials.location
        })
    }, [info.open])

    //handles the opening event. will set the info.open to true
    const handleOpen = () => {
        setInfo({
            ...info, 
            open: true
        });
    }

    //handles the closing event. will set the info.open to FALSE
    const handleClose = () => {
        setInfo({
            ...info, 
            open: false
        });
    }

    //handles the change event in the text fields. Synching the change 
    //with what is in the state
    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    //handle the submit event. Sending all the new information to the server
    //including the user credentials
    const handleSubmit = () => {
        const userDetails = {
          bio: info.bio,
          website: info.website,
          location: info.location,
          img_url: info.img_url,
          user_id: credentials.id
        };
        editUserDetails(userDetails);
        handleClose();
      };

    return (
        <Fragment>
            {/* this is will only the button to edit the info at first. 
            if clicked will show the dialog below */}
            <MyButton tip="Edit Details" onClick={() => handleOpen()} btnClassName={classes.button}>
                <EditIcon color="primary" />
            </MyButton>
            {/* dialog will only be open if open is true.
            when it closes, it will call handleClose */}
            <Dialog
                open={info.open}
                onClose={() => handleClose()}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                        {/* form to set all the user details */}
                        <TextField
                            name="bio"
                            tpye="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            className={classes.textField}
                            value={info.bio}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            tpye="text"
                            label="Website"
                            placeholder="Youtube/Twitch/Facebook Game channel"
                            className={classes.textField}
                            value={info.website}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                        />
                        <TextField
                            name="location"
                            tpye="text"
                            label="Location"
                            placeholder="Where you live"
                            className={classes.textField}
                            value={info.location}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                        />
                        <TextField
                            name="img_url"
                            tpye="text"
                            label="Profile Image (URL)"
                            placeholder="Add your profile image here"
                            className={classes.textField}
                            value={info.img_url}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                        />
                        </form>
                    </DialogContent>
                    <DialogActions>
                    {/* if clicked on cancel just close the dialog */}
                        <Button onClick={() => handleClose()} color="primary">
                            Cancel
                        </Button>
                        {/* if clicked on Save call submit function */}
                        <Button onClick={() => handleSubmit()} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
        </Fragment>
    )
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    credentials: state.user.credentials
  });
  
  export default connect(
    mapStateToProps,
    { editUserDetails }
  )(withStyles(styles)(EditDetails));