import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CardItem from '../../molecules/CardItem';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

const FavoriteList = props => {
  const { classes } = props;

  const createFavoriteItem = favoriteList => {
    let listItems = [];
    for (const favorite of favoriteList) {
      for (const spaceNo of favorite.spaceNo) {
        const matchedCircle = props.circleInfo.filter(circle => {
          return circle.spaceNo.indexOf(spaceNo) > -1;
        });

        const itemProps = {
          avaterLabel: spaceNo,
          primarylabel: matchedCircle[0].circleName,
          secondarylabel: matchedCircle[0].personName,
          typeColor: favorite.color,
          selectItem: props.selectCircle,
          deleteItem: props.deleteFavoriteCircle
        };
        listItems.push(<CardItem key={spaceNo} {...itemProps} />);
      }
    }

    // 未登録の時
    if (listItems.length === 0) {
      listItems.push(<Typography variant={'title'}>登録サークルが0件だよ。配置図から登録してみてね。</Typography>);
    }

    return listItems;
  };

  return (
    <div className={classes.root}>
      <List>{createFavoriteItem(props.favorite)}</List>
    </div>
  );
};

FavoriteList.propTypes = {
  classes: PropTypes.object.isRequired,
  favorite: PropTypes.array.isRequired,
  circleInfo: PropTypes.array.isRequired,
  deleteFavoriteCircle: PropTypes.func,
  selectCircle: PropTypes.func
};

export default withStyles(styles)(FavoriteList);
