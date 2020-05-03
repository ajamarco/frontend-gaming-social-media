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

const styles = (theme) => ({
    ...theme.spreadThis
});

function CommentForm({classes, user, submitComment, postId}) {
    const [body, setBody] = useState('');

    const handleChange = (e) => {
        setBody(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = {
            content: body,
            post_id: postId,
            user_id: user.credentials.id
        }
        submitComment(comment);
        setBody("");
      };

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
    ):(null);


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