
import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../Helpers/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
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

const styles = (theme) => ({
    ...theme.spreadThis,
    profileImage: {
      maxWidth: 150,
      height: 150,
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

function PostDetails({classes, getPost, post, postDetails, postId, ui}) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
      postId && getPost(postId);
    }, [open])
  
    const dialogMarkup = ( !ui.loading && open ? (
      <Grid container spacing={16}>
            <Grid item sm={5}>
                {/* user picture */}
                <img 
                    src={post.user.img_url ? post.user.img_url : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} 
                    alt="Profile"
                    className={classes.profileImage}/>
            </Grid>
            <Grid item sm={7}>
                <Typography
                component={Link}
                color="primary"
                variant="h5"
                to={`/users/${post.user.user_id}`}
                > 
                    {post.user.email}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body2" color="textSecondary">
                    {dayjs(post.created_at).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant="body1">
                    {post.content}
                </Typography>
                <LikeButton postId={post.id}/>
                <span>{post.likes_number} likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                <span>{post.comments_on_post.length} comments</span>
            </Grid>
            <hr className={classes.visibleSeparator} />
            <CommentForm postId={post.id} />
            <Comments comments={post.comments_on_post}/>
        </Grid>
    ) : (<h3>LOADING...</h3>)
      
        
    )

    return (
        <React.Fragment>
            <MyButton onClick={() => setOpen(true)} tip="Post details" tipClassName={classes.expandButton}>
                <UnfoldMore color="primary"/>
            </MyButton>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
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
            <DialogContent className={classes.DialogContent}>
                {dialogMarkup}
            </DialogContent>

            </Dialog>
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
    post: state.data.post,
    ui: state.ui
  });

  const mapActionsToProps = {
    getPost 
  };

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(PostDetails));