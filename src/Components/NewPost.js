import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../Helpers/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { createNewPost } from '../Redux/Actions/DataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
      position: 'relative',
      float: 'right',
      marginTop: 10
    },
    progressSpinner: {
      position: 'absolute'
    },
    closeButton: {
      position: 'absolute',
      left: '91%',
      top: '6%'
    }
  });


function NewPost({classes, createNewPost, user}) {
    const [open, setOpen] = useState(false);
    const [body, setBody] = useState('');

    const handleChange = (e) => {
        setBody(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            content: body,
            user_id: user.credentials.id
        }
        //create a new post here. find the action
        createNewPost(post);
        setOpen(false);
      };


    return (
        <React.Fragment>
            <MyButton onClick={() => setOpen(true)} tip="Create new post">
                <AddIcon/>
            </MyButton>
            <Dialog
                open={open}
                onClose={()=> setOpen(false)}
                fullWidth
                maxWidth="sm"
                >
                <MyButton 
                    tip="Close"
                    onClick={() => setOpen(false)}
                    tipClassName={classes.closeButton}
                    >
                    <CloseIcon/>
                </MyButton>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <TextField
                            name="body"
                            type="text"
                            label="post"
                            multiline
                            rows="3"
                            placeholder="Type the content of your new post here"
                            className={classes.TextField}
                            onChange={(e) => handleChange(e)}
                            fullWidth/>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            // disabled={loading} TODO: disable if ui is loading
                        >
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}


NewPost.propTypes = {
    newPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
  });
  
  export default connect(
    mapStateToProps,
    { createNewPost}
  )(withStyles(styles)(NewPost));