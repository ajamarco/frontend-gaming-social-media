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

//styles for the delete button
const styles = {
    deleteButton: {
      position: 'absolute',
      left: '90%',
      top: '10%'
    }
  };


//MAIN function
function DeleteButton({classes, id, deletePost}) {
    //controls if the dialog will show or not
    const [open, setOpen] = useState(false);

    //handles the delete button, calling the deletePost function and 
    //hiding the dialog
    const handleDelete = (postId) => {
        deletePost(postId);
        setOpen(false);
    }
    return (
        <div>
            <React.Fragment>
                {/*sets the MyButton component to show an X for deleting a post*/}
                {/* if clicked on that button, opens the dialog */}
                 <MyButton 
                    tip="Delete Post"
                    onClick={() => setOpen(true)}
                    btnClassName={classes.deleteButton}
                    >
                    <DeleteOutline color="secondary"/>
                </MyButton>
                {/* will only be opened if open is true 
                if closes will set the open to false */}
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
                    {/* if clicked on cancel just close the dialog using the
                    useState */}
                        <Button 
                            onClick={() => setOpen(false)}
                            color="primary"
                            >
                            Cancel   
                        </Button>
                        {/* if clicks on the delete button 
                        send the post id to handleDelete */}
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