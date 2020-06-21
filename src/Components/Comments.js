import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//setup the styles
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

    //function call for each comment inside 'comments'
    const renderComment = (comment, index) => {
        //extract the content, user_id e date from comment
        const {content, user_id, created_at} = comment;
        //if user has img_url, use that. Otherwise, use the default img
        const img_url = comment.user.img_url  ? comment.user.img_url : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
        return (
            /*for each fragment, use the date as key */
            <React.Fragment key={created_at}>

                {/*create a new grid for each comment */}
                <Grid item sm={12}>
                    <Grid container>

                        {/*use the img_url for the image inside the comment*/}
                        <Grid item sm={2}>
                            <img src={img_url} alt="profile" className={classes.commentImage}/>
                        </Grid>

                        <Grid item sm={9}>
                            <div className={classes.commentData}>
                            {/*Add the user email inside the grid*/}
                                <Typography
                                    variant="h5"
                                    color="primary"
                                >
                                    {comment.user.email}
                                </Typography>
                                {/*Also, inside the grid, add the formatted date*/}
                                <Typography variant="body2" color="textSecondary">
                                    {dayjs(created_at).format('h:mm a, MMMM DD YYYY')}
                                </Typography>
                                {/*Comment content*/}
                                <hr className={classes.invisibleSeparator}/>
                                <Typography variabnt="body1">{content}</Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                {/*if index is not the last value in the array, add a visible separator*/}
                {index !== comments.length - 1 && (
                <hr className={classes.visibleSeparator} />)}
            </React.Fragment>
        )
    }

    return (
        /*Setup a Grid component of type 'container' */
        <Grid container>
            {/*for each comment call renderComment(passing the index and the content) */}
            {comments.map((comment, index) => {
                return renderComment(comment, index)
            })}
        </Grid>
    )
}

//setting up the proptypes of Comments
Comments.propTypes = {
    comments: PropTypes.array.isRequired
  };
  
export default withStyles(styles)(Comments);