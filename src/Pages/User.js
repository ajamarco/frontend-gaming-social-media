import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import StaticProfile from '../Components/profile/StaticProfile'
import RenderPost from '../Components/RenderPost'
//UI
import Grid from '@material-ui/core/Grid';

//Redux
import { connect } from 'react-redux';
import {getUser} from '../Redux/Actions/DataActions'

function User({match, getUser, data}) {
    const [userPosts, setUserPosts] = useState('');
    const [user, setUser] = useState('');
    useEffect(() => {
        getUser(match.params.user_id)
        setUserPosts(data.posts.filter(p => {
          return p.user.user_id == match.params.user_id
        }))
    }, [])
const profileMarkup = (
  data.loading ? (
    <p>loading</p>
  ) : (
    <StaticProfile profile={data.userData}/>
  )
)

const renderPost = (p) => {
  return(
    <RenderPost key={p.id} post={p}/>
  )
}

const postMarkup = (
  data.loading ? (
    <p>Loading Posts</p>
  ) : (
        data.userData.posts === undefined ? (
          <p>No posts for this user</p>
        ) : (
              data.userPosts.map(p => renderPost(p))
        )
  )
)
    
    return (
      <Grid container spacing={16}>
        <Grid item sm={4} xs={12}>
          {profileMarkup}
        </Grid>
        <Grid item sm={8} xs={12}> 
          {postMarkup}
        </Grid>
      </Grid>
    )
}


User.propTypes = {
    getUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(
    mapStateToProps,
    { getUser }
  )(User);