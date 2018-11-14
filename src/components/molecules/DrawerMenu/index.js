import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';

const styles = () => ({});

class ResponsiveDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({
      drawerOpen: true
    });
  }

  handleClose() {
    this.setState({
      drawerOpen: false
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position={'static'}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleOpen}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {this.props.navigationLabel}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.drawerOpen} onClose={this.handleClose}>
          <div className={classes.toolbar} />
          <Divider />
          <div onClick={this.handleClose} onKeyDown={this.handleClose}>
            {this.props.children}
          </div>
        </Drawer>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  // メニューに表示する項目。ReactComponent
  children: PropTypes.node.isRequired,
  // 上のとこに表示するラベル
  navigationLabel: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
