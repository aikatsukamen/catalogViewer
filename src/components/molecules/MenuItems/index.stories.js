import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MenuItems from '.';
import List from '@material-ui/core/List';
import { BrowserRouter } from 'react-router-dom';

storiesOf('MenuItems', module).add('呼び出し', () => (
  <BrowserRouter>
    <List>
      <MenuItems />
    </List>
  </BrowserRouter>
));
