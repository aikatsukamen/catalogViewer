import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CardItem from '../../molecules/CardItem';
import Divider from '@material-ui/core/Divider';
import SearchForm from '../../molecules/SearchForm';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

const Search = props => {
  const { classes } = props;

  const createSearchResult = () => {
    let listItems = [];
    for (const spaceNo of props.search) {
      const matchedCircle = props.circleInfo.filter(circle => {
        return circle.spaceNo.indexOf(spaceNo) > -1;
      });

      const itemProps = {
        avaterLabel: spaceNo,
        primarylabel: matchedCircle[0].circleName,
        secondarylabel: matchedCircle[0].person,
        typeColor: '',
        selectItem: props.selectCircle,
        delete: false
      };
      listItems.push(<CardItem key={spaceNo} {...itemProps} />);
    }

    return listItems;
  };

  return (
    <div className={classes.root}>
      {/* 検索入力 */}
      <SearchForm searchCircle={props.searchCircle} />
      <Divider />
      {/* 検索結果 */}
      <List>{createSearchResult()}</List>
    </div>
  );
};

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  search: PropTypes.array.isRequired,
  circleInfo: PropTypes.array.isRequired,
  selectCircle: PropTypes.func.isRequired,
  searchCircle: PropTypes.func.isRequired
};

export default withStyles(styles)(Search);
