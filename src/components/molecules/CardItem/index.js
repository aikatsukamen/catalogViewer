import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    fontSize: 'medium',
    wordBreak: 'keep-all'
  },
  hide: {
    display: 'none'
  }
});

const CardItem = props => {
  const { classes } = props;

  const handleItemClick = () => {
    props.selectItem(props.avaterLabel);
  };

  const handleDeleteClick = () => {
    props.deleteItem(props.avaterLabel);
  };

  const deleteIconClass = classNames({
    [props.classes.hide]: !props.delete
  });

  return (
    <div className={classes.root} key={props.avaterLabel}>
      <ListItem dense button className={classes.listItem} onClick={handleItemClick}>
        <Avatar style={{ backgroundColor: props.typeColor, color: 'initial' }} className={classes.avatar}>
          {props.avaterLabel}
        </Avatar>
        <ListItemText primary={props.primarylabel} secondary={props.secondarylabel} />
        {/* 削除アイコン */}
        <ListItemSecondaryAction className={deleteIconClass}>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

CardItem.propTypes = {
  classes: PropTypes.object.isRequired,
  avaterLabel: PropTypes.string.isRequired,
  primarylabel: PropTypes.string.isRequired,
  secondarylabel: PropTypes.string.isRequired,
  typeColor: PropTypes.string.isRequired,
  delete: PropTypes.bool,
  deleteItem: PropTypes.func,
  selectItem: PropTypes.func
};

CardItem.defaultProps = {
  delete: true
};

export default withStyles(styles)(CardItem);
