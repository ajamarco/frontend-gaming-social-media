import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import {submitComment} from '../Redux/Actions/DataActions';

//on the style we just add the main style file
const styles = (theme) => ({
    ...theme.spreadThis
});

//MAIN function
function CommentForm({classes, user, submitComment, postId}) {
    const [body, setBody] = useState('');

    const handleChange = (e) => {
        setBody(e.target.value);
    }

    //handles the submit comment button
    const handleSubmit = (e) => {
        e.preventDefault();
        //create a new comment object
        const comment = {
            content: body,
            post_id: postId,
            user_id: user.credentials.id
        }
        //we send this object to the submitComment function 
        submitComment(comment);
        //reset the body for a new comment
        setBody("");
      };

    //holds what the html will looks like. 
    //if the user is authenticated we will show the form
    const commentFormMarkup = user.authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            name="body"
            type="text"
            label="Comment on post"
            value={body}
            onChange={(e) => handleChange(e)}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <hr className={classes.invisibleSeparator} />            
        </Grid>
    ):/*if is NOT logged in we will show nothing */ (null);

    //commentFormMarkup will show on the screen
    return commentFormMarkup
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
  });

export default connect(
    mapStateToProps,
    { submitComment }
  )(withStyles(styles)(CommentForm));