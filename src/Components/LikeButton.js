import React from 'react';
import MyButton from '../Helpers/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../Redux/Actions/DataActions';

function LikeButton({user, likePost, unlikePost, postId}) {
    const likedPost = () => {
        //check if postid is inside the array of likes of user
        if (user.likes.includes(postId)) return true;
        return false
    }

    const handleLikePost = () => {
        const body = {
            postId: postId,
            userId: user.credentials.id
        }
        likePost(body);
    }

    const handleUnlikePost = () => {
        const body = {
            postId: postId,
            userId: user.credentials.id
        }
        unlikePost(body);
    }

    const authenticated = user.authenticated;

    //if the user is not authenticated
    const likeBtn = !authenticated ? (
        <Link to="/login">
            <MyButton tip="Like">
                <FavoriteBorder color="primary"/>
            </MyButton>
        </Link>
        //if user is authenticated and already liked post we show the option to UNLIKE it
    ) : likedPost() ? (
        <MyButton tip="Unlike Post" onClick={() => handleUnlikePost()}>
            <FavoriteIcon color="primary"/>
        </MyButton>
        //if user not liked the post yet, we show the option to actually like the post
    ) : (
        <MyButton tip="Like" onClick={() => handleLikePost()}>
            <FavoriteBorder color="primary"/>
        </MyButton>
    )

    return (
        <React.Fragment>
            {likeBtn}
        </React.Fragment>
    )
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user
  });
  
  const mapActionsToProps = {
    likePost,
    unlikePost
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(LikeButton);