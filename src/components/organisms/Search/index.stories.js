import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Search from '.';

const circleInfo = {
  circleName: 'やめてね☆選取チョモランマ',
  circleNameKana: 'ヤメテネヨリドリチョモランマ',
  spaceNo: 'ル62',
  personName: '選取みどり',
  personNameKana: 'ヨリドリミドリ',
  genre: '音楽CD、アレンジ音楽CD',
  twitter: 'http://twitter.com/midori_yoridori',
  pixiv: '',
  url: 'https://midoriyoridori.wixsite.com/midmus',
  circleCutImage: 'https://ketto.xsrv.jp/html/mimiken/cut/ai17_1462.jpg',
  menuImage: 'https://pbs.twimg.com/media/Dpjm1RtU4AAchwQ.jpg',
  kktId: '@midori_aikatsu'
};

const searchProps = {
  search: ['ル62'],
  circleInfo: [circleInfo],
  selectCircle: action('サークルを選択した時の動作'),
  searchCircle: action('検索ボタン')
};

storiesOf('Search', module).add('1件検索ヒット', () => <Search {...searchProps} />);
