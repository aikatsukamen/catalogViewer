import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: 'initial',
    boxShadow: theme.shadows[5],
    padding: 0,
    marginLeft: 'calc((100% - 300px) /2)',
    marginTop: '5px'
  }
});

const SimpleModal = props => {
  const handleClose = () => {
    props.modalClose();
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <div className={props.classes.paper}>{props.children}</div>
    </Modal>
  );
};

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  modalClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default withStyles(styles)(SimpleModal);
