import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const styles = {
    card: {
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

function RenderPost({classes, post}) {
    dayjs.extend(relativeTime);
    return (
        <Card className={classes.card}>
            <CardMedia 
                image={'https://randomuser.me/api/portraits/med/men/75.jpg'}
                title="Profile image"
                className={classes.image}
            />
            <CardContent className={classes.content}>
                <Typography 
                    variant="h5" 
                    component={Link} 
                    to={`/users/${post.user.user_id}`}
                    color="primary">
                    {post.user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {dayjs(post.created_at).fromNow()}
                </Typography>
                <Typography variant="body1">
                    {post.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(RenderPost)