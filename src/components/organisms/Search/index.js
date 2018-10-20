import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CardItem from '../../molecules/CardItem';
import Divider from '@material-ui/core/Divider';
import SearchForm from '../../molecules/SearchForm';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Select from '@material-ui/core/Select';

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

      let typeColor = '';
      for (const favorite of props.favorite) {
        if (favorite.spaceNo.indexOf(matchedCircle[0].spaceNo) > -1) {
          typeColor = favorite.color;
          break;
        }
      }

      const itemProps = {
        avaterLabel: spaceNo,
        primarylabel: matchedCircle[0].circleName,
        secondarylabel: matchedCircle[0].person,
        typeColor: typeColor,
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
      <SearchForm searchCircle={props.searchCircle} searchKkt={props.searchKkt} />
      <Divider />
      {/* お気に入り一括追加 */}
      <div className={props.classes.favorite}>
        <InputLabel>
          検索結果を一括でお気に入り登録
          {/* <FavoriteIcon color={'secondary'} /> */}
        </InputLabel>
        <Select
          value={props.searchToFavoriteId}
          onChange={event => {
            props.searchToFavorite(event.target.value);
          }}
          autoWidth={true}
        >
          <MenuItem value={'-1'}>
            <em>お気に入り未登録</em>
          </MenuItem>
          <MenuItem value={'0'}>キュート</MenuItem>
          <MenuItem value={'1'}>クール</MenuItem>
          <MenuItem value={'2'}>セクシー</MenuItem>
          <MenuItem value={'3'}>ポップ</MenuItem>
        </Select>
      </div>
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
  searchCircle: PropTypes.func.isRequired,
  searchKkt: PropTypes.func.isRequired,
  favorite: PropTypes.array.isRequired,
  searchToFavoriteId: PropTypes.string.isRequired,
  searchToFavorite: PropTypes.func.isRequired
};

export default withStyles(styles)(Search);
