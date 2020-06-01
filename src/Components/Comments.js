import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme.spreadThis,
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '20%'
  },
  commentData: {
    marginLeft: 20
  }
});

function Comments({comments, classes}) {

    const renderComment = (comment, index) => {
        const {content, user_id, created_at} = comment;
        const img_url = comment.user.img_url  ? comment.user.img_url : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
        console.log('inside comments', img_url)
        // TODO: add a img_url for the user image;
        // TODO: add the user name instead of the user_id
        return (
            <React.Fragment key={created_at}>
                <Grid item sm={12}>
                    <Grid container>
                        <Grid item sm={2}>
                            <img src={img_url} alt="profile" className={classes.commentImage}/>
                        </Grid>
                        <Grid item sm={9}>
                            <div className={classes.commentData}>
                                <Typography
                                    variant="h5"
                                    color="primary"
                                >
                                    {comment.user.email}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {dayjs(created_at).format('h:mm a, MMMM DD YYYY')}
                                </Typography>
                                <hr className={classes.invisibleSeparator}/>
                                <Typography variabnt="body1">{content}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />)}
            </React.Fragment>
        )
    }

    return (
        <Grid container>
            {comments.map((comment, index) => {
                return renderComment(comment, index)
            })}
        </Grid>
    )
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
  };
  
export default withStyles(styles)(Comments);