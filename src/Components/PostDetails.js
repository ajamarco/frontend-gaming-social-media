
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../Helpers/MyButton';
import LikeButton from './LikeButton';
// import Comments from './Comments';
// import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import {getPost} from '../Redux/Actions/DataActions';
//TODO: create the get post function on user action
const styles = (theme) => ({
    ...theme.spreadThis,
    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: '50%',
      objectFit: 'cover'
    },
    dialogContent: {
      padding: 20
    },
    closeButton: {
      position: 'absolute',
      left: '90%'
    },
    expandButton: {
      position: 'absolute',
      left: '90%'
    },
    spinnerDiv: {
      textAlign: 'center',
      marginTop: 50,
      marginBottom: 50
    }
  });

function PostDetails({classes, getPost, post, UI}) {
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <MyButton onClick={() => setOpen(true)} tip="Post details" tipClassName={classes.expandButton}>
                <UnfoldMore color="primary"/>
            </MyButton>
        </React.Fragment>
    )
}

PostDetails.propTypes = {
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };

  const mapStateToProps = (state) => ({
    scream: state.data.post,
    UI: state.UI
  });

  const mapActionsToProps = {
    getPost 
  };

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(PostDetails));