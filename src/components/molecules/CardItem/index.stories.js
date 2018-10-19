import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CardItem from '.';
import List from '@material-ui/core/List';

storiesOf('CardItem', module)
  .add('1つ', () => (
    <List>
      <CardItem avaterLabel={'ア01'} primarylabel={'サークル名1'} secondarylabel={'ペンネーム1'} selectItem={action('選択')} deleteItem={action('削除')} />
    </List>
  ))
  .add('1つ 消せない', () => (
    <List>
      <CardItem avaterLabel={'ア01'} primarylabel={'サークル名1'} secondarylabel={'ペンネーム1'} selectItem={action('選択')} deleteItem={action('削除')} delete={false} />
    </List>
  ))
  .add('5つ', () => (
    <List>
      <CardItem avaterLabel={'ア01'} primarylabel={'サークル名1'} secondarylabel={'ペンネーム1'} selectItem={action('選択')} deleteItem={action('削除')} />
      <CardItem avaterLabel={'ア02'} primarylabel={'サークル名2'} secondarylabel={'ペンネーム2'} selectItem={action('選択')} deleteItem={action('削除')} />
      <CardItem avaterLabel={'ア03'} primarylabel={'サークル名3'} secondarylabel={'ペンネーム3'} selectItem={action('選択')} deleteItem={action('削除')} />
      <CardItem avaterLabel={'ア04'} primarylabel={'サークル名4'} secondarylabel={'ペンネーム4'} selectItem={action('選択')} deleteItem={action('削除')} />
      <CardItem avaterLabel={'ア05'} primarylabel={'サークル名5'} secondarylabel={'ペンネーム5'} selectItem={action('選択')} deleteItem={action('削除')} />
    </List>
  ));
