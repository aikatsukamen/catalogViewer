import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import LinkIcon from '@material-ui/icons/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  card: {
    width: '300px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  avatar: {
    fontSize: 'medium',
    wordBreak: 'keep-all'
  },
  actions: {},
  socialArea: {
    display: 'flex'
  },
  socialImage: {
    height: '25px'
  },
  noDisplay: {
    display: 'none'
  },
  additionalImage: {
    maxWidth: '350px',
    height: '100px'
  },
  favorite: {
    width: '100%',
    display: 'flex'
  },
  additionalImageArea: {
    marginTop: '10px'
  }
});

const CircleDetail = props => {
  const { classes } = props;

  const twitterId = props.circleInfo.twitter ? `@${props.circleInfo.twitter.match(/\/.+\/(.+?)$/)[1]}` : '';
  const pixivId = props.circleInfo.pixiv ? props.circleInfo.pixiv.match(/id=(.+)/)[1] : '';

  let favoriteId = '-1';
  let typeColor = '';
  for (const fav of props.favorite) {
    if (fav.spaceNo.indexOf(props.circleInfo.spaceNo) > -1) {
      favoriteId = fav.id;
      typeColor = fav.color;
      break;
    }
  }

  const twitterClassnames = classnames({
    [props.classes.socialArea]: twitterId,
    [props.classes.noDisplay]: !twitterId
  });

  const pixivClassnames = classnames({
    [props.classes.socialArea]: pixivId,
    [props.classes.noDisplay]: !pixivId
  });

  const kktClassnames = classnames({
    [props.classes.socialArea]: props.circleInfo.kktId,
    [props.classes.noDisplay]: !props.circleInfo.kktId
  });

  const otherUrlClassnames = classnames({
    [props.classes.socialArea]: props.circleInfo.url,
    [props.classes.noDisplay]: !props.circleInfo.url
  });

  const additionalClassnames = classnames({
    [props.classes.additionalImage]: props.circleInfo.menuImage,
    [props.classes.noDisplay]: !props.circleInfo.menuImage
  });

  const handleChange = event => {
    props.changeFavoriteId({
      id: event.target.value,
      spaceNo: props.circleInfo.spaceNo
    });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar style={{ backgroundColor: typeColor, color: 'initial' }} className={classes.avatar}>
            {props.circleInfo.spaceNo}
          </Avatar>
        }
        title={props.circleInfo.circleName}
        subheader={props.circleInfo.personName}
      />
      <CardMedia className={classes.media} image={props.circleInfo.circleCutImage} title={props.circleInfo.circleName} />
      <CardContent>
        <Typography component="p">{props.circleInfo.genre}</Typography>
      </CardContent>
      <CardActions>
        <div className={classes.actions}>
          <Divider />
          {/* Twitter */}
          <div className={twitterClassnames}>
            <a href={props.circleInfo.twitter} target="_blank">
              <img src="./images/social_twitter.png" className={props.classes.socialImage} />
            </a>
            {twitterId}
          </div>
          {/* Pixiv */}
          <div className={pixivClassnames}>
            <a href={props.circleInfo.pixiv} target="_blank">
              <img src="./images/social_pixiv.jpg" className={props.classes.socialImage} />
            </a>
            {pixivId}
          </div>
          {/* kkt */}
          <div className={kktClassnames}>
            <a href={`https://kirakiratter.com/${props.circleInfo.kktId}`} target="_blank">
              <img src="./images/social_kkt.png" className={props.classes.socialImage} />
            </a>
            {props.circleInfo.kktId}
          </div>
          {/* URL */}
          <div className={otherUrlClassnames}>
            <a href={props.circleInfo.url} target="_blank">
              <LinkIcon />
            </a>
            {props.circleInfo.url}
          </div>
          <Divider />
          {/* お気に入り登録 */}
          <div className={props.classes.favorite}>
            <InputLabel>
              <FavoriteIcon color={'secondary'} />
            </InputLabel>
            <Select value={favoriteId} onChange={handleChange} autoWidth={true}>
              <MenuItem value={'-1'}>
                <em>お気に入り未登録</em>
              </MenuItem>
              <MenuItem value={'0'}>キュート</MenuItem>
              <MenuItem value={'1'}>クール</MenuItem>
              <MenuItem value={'2'}>セクシー</MenuItem>
              <MenuItem value={'3'}>ポップ</MenuItem>
            </Select>
          </div>
          <Divider />
          {/* その他参考画像 */}
          <div className={props.classes.additionalImageArea}>
            <Typography>お品書き画像</Typography>
            <a href={props.circleInfo.menuImage} target="_blank">
              <img src={props.circleInfo.menuImage} className={additionalClassnames} />
            </a>
          </div>
        </div>
      </CardActions>
    </Card>
  );
};

CircleDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  circleInfo: PropTypes.object.isRequired,
  favorite: PropTypes.array.isRequired,
  changeFavoriteId: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(CircleDetail);
