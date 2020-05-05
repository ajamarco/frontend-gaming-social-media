import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    ...theme.spreadThis
  });

function StaticProfile({classes, profile}) {
    console.log("profile loaded",profile);
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} alt="profile" className="profile-image" />
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink
                        component={Link}
                        
                        // link
                        to={`/users/${1}`}
                        color="primary"
                        variant="h5">
                        {profile.email}
                    </MuiLink>
                    <hr/>
                    {profile.bio && <Typography variant="body2">{profile.bio}</Typography>}
                    <Typography variant="body2">bio</Typography>
                    <hr/>
                    {profile.location && (
                        <Fragment>
                        <LocationOn color="primary" /> <span>{profile.location}</span>
                        <hr />
                        </Fragment>
                    )}
                    {profile.website && (
                        <Fragment>
                        <LinkIcon color="primary" />
                        <a href={profile.website} target="_blank" rel="noopener noreferrer">
                            {' '}
                            Website
                        </a>
                        <hr />
                        </Fragment>
                    )}
                    <CalendarToday color="primary" />{' '}
                    <span>Joined {dayjs(profile.created_at).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(StaticProfile);