import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';
import MyButton from '../Helpers/MyButton';
import DeleteButton from './DeleteButton'
import LikeButton from './LikeButton'
import PostDetails from './PostDetails'
//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

function RenderPost({classes, post, user, actualPost}) {
    const img_url = post.user.img_url  ? post.user.img_url : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    
    const deleteButton = user.authenticated && user.credentials.id === post.user.user_id ? (
        <DeleteButton id={post.id} /> 
    ): null;

    dayjs.extend(relativeTime);
    console.log('inside render post. img url',img_url);
    return (
        <Card className={classes.card}>
            <CardMedia 
                image={img_url}
                title="Profile image"
                className={classes.image}
            />
            <CardContent className={classes.content}>
                <Typography 
                    variant="h5" 
                    color="primary">
                    {post.user.email}
                </Typography>
                {/* delete button if applicable*/}
                {deleteButton}
                <Typography variant="body2" color="textSecondary">
                    {dayjs(post.created_at).fromNow()}
                </Typography>
                <Typography variant="body1">
                    {post.content}
                </Typography>
                <LikeButton postId={post.id}/>
                <span>{post.likes_number} likes</span> 
                <MyButton tip="comments">
                    <ChatIcon color="primary"/>
                </MyButton>
                <span>{post.comments_on_post.length} comments</span>
                <PostDetails postDetails={post} userEmail={user.credentials.email} postId={post.id}/>
            </CardContent>
        </Card>
    )
}

RenderPost.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user
  });
  
  export default connect(mapStateToProps)(withStyles(styles)(RenderPost));