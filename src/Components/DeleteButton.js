import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../Helpers/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deletePost } from '../Redux/Actions/DataActions';

const styles = {
    deleteButton: {
      position: 'absolute',
      left: '90%',
      top: '10%'
    }
  };


function DeleteButton({classes, id, deletePost}) {
    const [open, setOpen] = useState(false);

    const handleDelete = (postId) => {
        deletePost(postId);
        setOpen(false);
    }
    return (
        <div>
            <React.Fragment>
                
                 <MyButton 
                    tip="Delete Post"
                    onClick={() => setOpen(true)}
                    btnClassName={classes.deleteButton}
                    >
                    <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    fullWidth
                    maxWidth="sm"
                    >
                    <DialogTitle>
                        Do you really want to delete this post? 
                    </DialogTitle>
                    <DialogActions>
                        <Button 
                            onClick={() => setOpen(false)}
                            color="primary"
                            >
                            Cancel   
                        </Button>
                        <Button 
                            onClick={() => handleDelete(id)}
                            color="secondary"
                            >
                            Delete   
                        </Button>
                    </DialogActions>
                    </Dialog>
            </React.Fragment>
        </div>
    )
}


DeleteButton.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
};
  
export default connect(
    null,
    { deletePost }
  )(withStyles(styles)(DeleteButton));