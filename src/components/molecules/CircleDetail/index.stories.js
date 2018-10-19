import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CircleDetail from '.';
import Modal from '../Modal';

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

storiesOf('CircleDetail', module)
  .add('normal', () => <CircleDetail circleInfo={circleInfo} favorite={[]} changeFavoriteId={action('お気に入り変更')} />)
  .add('モーダルと組み合わせ', () => (
    <Modal open={true} modalClose={action('モーダル閉じる')}>
      <CircleDetail circleInfo={circleInfo} favorite={[]} changeFavoriteId={action('お気に入り変更')} />
    </Modal>
  ))
  .add('空指定', () => (
    <Modal open={true} modalClose={action('モーダル閉じる')} changeFavoriteId={action('お気に入り変更')}>
      <CircleDetail circleInfo={{}} favorite={[]} />
    </Modal>
  ));
