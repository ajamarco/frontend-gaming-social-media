
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
// import ProfileSkeleton from '../../util/ProfileSkeleton';
// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../Redux/Actions/userActions';
import { Tooltip, IconButton } from '@material-ui/core';
import MyButton from '../Helpers/MyButton';

const styles = (theme) => ({
    ...theme.spreadThis
  });

const Profile = ({classes, user, logoutUser}) => {

    const img_url = user.credentials.img_url ? user.credentials.img_url : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    const handleLogout = (e) => {
        logoutUser();
    }

    //TODO - fix the blink with the login / sign up page before the user details are loaded (should show "loading" instead)
    let profileMarkup;
    profileMarkup = !user.loading ? (user.authenticated? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={`${img_url}`} alt="profile" className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${user.credentials.id}`} color="primary" variant="h5">
                        {user.credentials.email}
                    </MuiLink>
                    <hr/>
                    {/* Biography */}
                    <Typography variant="body2">
                        {user.credentials.bio ? user.credentials.bio : "Your bio goes here"}
                    </Typography>
                    <hr/>
                    {/* location */}
                    <> 
                        <LocationOn color="primary"/> <span>{user.credentials.location ? user.credentials.location : "No Location Yet"}</span>
                        <hr/>
                    </>
                    {/* website */}
                    <>
                        <LinkIcon color="primary">
                        </LinkIcon>
                        <span>
                            {user.credentials.website ? (
                                <a href={user.credentials.website} target="_blank" rel="noopener noreferrer">
                                {' '}
                                {"Website"}
                                </a>
                            ) : "No website yet"}
                             
                        </span>
                        <hr/>
                    </>
                    {/* Joined since */}
                    <>
                        <CalendarToday color="primary"/>{` `}
                        <span>Joined {dayjs(user.credentials.created_at).format('MMM YYYY')}</span>
                    </>
                </div>
                <MyButton tip="Logout" onClick={(e) => handleLogout(e) }>
                    <KeyboardReturn color="primary"/>
                </MyButton>
                 <EditDetails/>
            </div>
        </Paper>
    ) : (
        <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
                No profile found, please login
            </Typography>
            <div className={classes.buttons}>
                <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                <Button variant="contained" color="secondary" component={Link} to="/signup">Sign Up</Button>
            </div>
        </Paper>
    ) ) : (<p>Loading...</p>);

    return (
        <div>
            {profileMarkup}
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user
  });
  
  const mapActionsToProps = { logoutUser};
  
  Profile.propTypes = {
    // logoutUser: PropTypes.func.isRequired,
    // uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles)(Profile));
