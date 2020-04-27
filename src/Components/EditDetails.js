import React, { Component, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// import MyButton from '../../util/MyButton';
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

const styles = (theme) => ({
  ...theme.spreadThis,
  button: {
    float: 'right'
  }
});

function EditDetails({classes}) {
    const [info, setInfo] = useState({
        bio: '',
        website: '',
        location: '',
        open: false
    })

    useEffect(() => {
        //TODO: after setup the backend, add the value here
        setInfo({
            ...info,
            bio: 'testbio',
            website: 'http://www.youtube.com',
            location: 'London, UK'
        })
    }, [info.open])

    const handleOpen = () => {
        setInfo({
            ...info, 
            open: true
        });
    }

    const handleClose = () => {
        setInfo({
            ...info, 
            open: false
        });
    }

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        const userDetails = {
          bio: info.bio,
          website: info.website,
          location: info.location
        };
        // editUserDetails(userDetails);//TODO: call user action to edit user
        this.handleClose();
      };

    return (
        <Fragment>
            <Tooltip title="Edit Details" placement="top">
                <IconButton onClick={() => handleOpen()} className={classes.button}>
                    <EditIcon color="primary" />
                </IconButton>
            </Tooltip>
            <Dialog
                open={info.open}
                onClose={() => handleClose()}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
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
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()} color="primary">
                            Cancel
                        </Button>
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