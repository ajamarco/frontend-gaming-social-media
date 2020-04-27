import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Requests from '../Libraries/Requests'
import RenderPost from '../Components/RenderPost'
import Profile from '../Components/Profile'

function Home() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        Requests.fetchPosts()
          .then(data => setPosts(data));
    }, [])

    let recentPosts = posts ? (posts.map(p => (
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

export default Home
