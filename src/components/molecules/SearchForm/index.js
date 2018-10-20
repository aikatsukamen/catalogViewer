import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center'
  }
});

class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
  }

  // テキスト入力欄
  handleChange = name => event => {
    this.setState({
      searchWord: event.target.value
    });
  };

  handleSearchClick = () => {
    this.props.searchCircle(this.state.searchWord);
  };

  handleKktSearchClick = () => {
    this.props.searchKkt();
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        {/* 検索入力 */}
        <TextField id="filled-full-width" label="サークル検索" style={{ margin: 8, width: '50vw' }} placeholder="サークル名、ペンネーム、ジャンルなど" margin="normal" variant="filled" onChange={this.handleChange('name')} />
        <Button variant="fab" color="primary" onClick={this.handleSearchClick} mini>
          <SearchIcon />
        </Button>
        <Avatar alt="Remy Sharp" src="images/social_kkt.png" onClick={this.handleKktSearchClick} />
      </div>
    );
  }
}

SearchForm.propTypes = {
  classes: PropTypes.object.isRequired,
  searchCircle: PropTypes.func.isRequired,
  searchKkt: PropTypes.func.isRequired
};

export default withStyles(styles)(SearchForm);
