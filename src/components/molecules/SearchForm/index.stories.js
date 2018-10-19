import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SearchForm from '.';

const searchProps = {
  searchCircle: action('検索ボタン')
};

storiesOf('SearchForm', module).add('2件検索', () => <SearchForm {...searchProps} />);
