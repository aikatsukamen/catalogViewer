import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Map from '@material-ui/icons/Map';
import Favorite from '@material-ui/icons/Favorite';
import Search from '@material-ui/icons/Search';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Cloud from '@material-ui/icons/Cloud';

const NavigationMenuItems = () => {
  return (
    <div>
      <Link to={`${process.env.PUBLIC_URL}/`} style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <Map />
          </ListItemIcon>
          <ListItemText primary={'配置図'} />
        </ListItem>
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/favorite`} style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <Favorite />
          </ListItemIcon>
          <ListItemText primary={'お気に入りサークル'} />
        </ListItem>
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/search`} style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <Search />
          </ListItemIcon>
          <ListItemText primary={'サークル検索'} />
        </ListItem>
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/purchase`} style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary={'買い物リスト'} />
        </ListItem>
      </Link>
      <Divider />
      <Link to={`${process.env.PUBLIC_URL}/sync`} style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <Cloud />
          </ListItemIcon>
          <ListItemText primary={'SAVE&LOAD'} />
        </ListItem>
      </Link>
    </div>
  );
};

export default NavigationMenuItems;
