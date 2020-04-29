import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Requests from '../Libraries/Requests'
import RenderPost from '../Components/RenderPost'
import Profile from '../Components/Profile'
import PropTypes from 'prop-types'

//redux
import {connect} from 'react-redux'
import {getPosts} from '../Redux/Actions/DataActions'

function Home({getPosts, data}) {
    const [posts, setPosts] = useState([]);
    console.log("posts are", posts);
    console.log(data.posts);

    useEffect(() => {
        getPosts();
        setPosts(data.posts);
    }, [])

    let recentPosts = data.posts ? (data.posts.map(p => (
        <RenderPost post={p} key={p.id}/>
    ))) : <p>Loading...</p>;
    return (
        <Grid container spacing={7}>
            <Grid item sm={4} xs={12}>
                <Profile/>
            </Grid>
            <Grid item sm={8} xs={12}>
                {recentPosts}
            </Grid>
        </Grid>
    )
}

Home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });

export default connect(mapStateToProps,{getPosts})(Home)
